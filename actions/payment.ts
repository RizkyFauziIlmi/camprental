"use server";

import { User } from "next-auth";
import { CartItem } from "./../hooks/use-cart";
import { db } from "@/lib/db";
import { snap } from "@/lib/midtrans";
import { createId } from "@paralleldrive/cuid2";
import { getFirstName, getLastName } from "@/lib/string";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { differenceInDays } from "date-fns";

export const checkout = async (
  orderId: string,
  cartItems: CartItem[],
  total: number,
  daysDifference: number,
  customer: User,
  startDate: Date,
  endDate: Date
) => {
  // check items stock in db
  for (const item of cartItems) {
    const itemInDB = await db.item.findUnique({
      where: {
        id: item.id,
      },
      select: {
        stock: true,
      },
    });

    if (!itemInDB) {
      console.log(item.id);
      return { error: "Invalid Item ID" };
    }

    if (item.count > itemInDB.stock) {
      return {
        error: `Stock not available, only ${itemInDB.stock} ${item.name} left`,
      };
    }
  }

  // create transaction
  const url = await snap.createTransactionRedirectUrl({
    transaction_details: {
      order_id: orderId,
      gross_amount: total,
    },
    item_details: [
      ...cartItems.map((item: CartItem) => ({
        id: item.id,
        price: item.price * daysDifference,
        quantity: item.count,
        name: item.name,
      })),
      {
        id: createId(),
        price: 2_000,
        quantity: 1,
        name: "application fee",
      },
    ],
    customer_details: {
      email: customer.email ?? "",
      first_name: getFirstName(customer.name as string),
      last_name: getLastName(customer.name as string),
    },
  });

  try {
    // update stock in db
    cartItems.forEach(async (item) => {
      await db.item.update({
        where: {
          id: item.id,
        },
        data: {
          stock: {
            decrement: item.count,
          },
        },
      });
    });

    // create booking
    const booking = await db.booking.create({
      data: {
        id: orderId,
        paymentUrl: url,
        total,
        userId: customer.id as string,
        startDate,
        endDate,
      },
    });

    // insert order items to booking
    await db.orderItem.createMany({
      data: [
        ...cartItems.map((item: CartItem) => ({
          quantity: item.count,
          price: item.price,
          itemId: item.id,
          bookingId: booking.id,
        })),
      ],
    });
  } catch (error) {
    return { error: "Checkout Error" };
  }

  revalidatePath("/booking");
  redirect(url);
};

export const generateNewPaymentLink = async (bookingId: string) => {
  const user = await currentUser();
  const booking = await db.booking.findUnique({
    where: {
      id: bookingId,
    },
    include: {
      orderItems: {
        include: {
          item: true,
        },
      },
    },
  });

  if (!booking) {
    return { error: "Invalid Booking ID" };
  }

  if (booking.userId !== user?.id) {
    return { error: "Unauthorized" };
  }

  if (booking.status !== "NOTPAID") {
    return { error: `Booking has been ${booking.status.toLowerCase()}` };
  }

  const daysDifference = differenceInDays(booking.endDate, booking.startDate);

  const url = await snap.createTransactionRedirectUrl({
    transaction_details: {
      order_id: bookingId,
      gross_amount: booking.total,
    },
    item_details: [
      ...booking.orderItems.map((orderItem) => ({
        id: orderItem.item.id,
        price: orderItem.price * daysDifference,
        quantity: orderItem.quantity,
        name: orderItem.item.name,
      })),
      {
        id: createId(),
        price: 2_000,
        quantity: 1,
        name: "application fee",
      },
    ],
    customer_details: {
      email: user?.email ?? "",
      first_name: getFirstName(user?.name as string),
      last_name: getLastName(user?.name as string),
    },
  });

  try {
    await db.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        paymentUrl: url,
      },
    });

    revalidatePath("/booking");

    return { success: "Success Generating New Payment Link" };
  } catch (error) {
    return { error: "Error Generating Payment Link" };
  }
};
