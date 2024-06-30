"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Booking } from "@prisma/client";
import { revalidatePath } from "next/cache";

const incrementStock = async (bookingId: string) => {
  const orderItems = await db.orderItem.findMany({
    where: {
      bookingId,
    },
    select: {
      itemId: true,
      quantity: true,
    },
  });

  for (const orderItem of orderItems) {
    await db.item.update({
      where: {
        id: orderItem.itemId,
      },
      data: {
        stock: {
          increment: orderItem.quantity,
        },
      },
    });
  }
}

export const deleteBooking = async (bookingId: string) => {
  const user = await currentUser();

  const booking = await db.booking.findUnique({
    where: {
      id: bookingId,
    },
    select: {
      id: true,
      userId: true,
      status: true
    },
  });

  if (!booking) {
    return { error: "Invalid Booking ID" };
  }

  if (booking.userId !== user?.id && user?.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  if (booking.status === "PAIDOFF") {
    return { error: "Cannot delete paid booking" };
  }

  try {
    // if booking is not cancelled or completed, increment item stock
    if (booking.status !== "COMPLETED") {
      // increment item stock
      incrementStock(booking.id);
    }

    await db.booking.delete({
      where: {
        id: bookingId,
      },
    });

    revalidatePath("/booking");
    revalidatePath("/dashboard");

    return { success: `Booking with ID ${booking.id} deleted successfully` };
  } catch (error) {
    return { error: "Error Deleting Booking" };
  }
};

export const updateBooking = async (bookingId: string, booking: Booking) => {
  const user = await currentUser();

  if (user?.role !== "ADMIN") {
    return { error: "Unauthorized" }
  }

  try {
    const updatedBooking = await db.booking.update({
      where: {
        id: bookingId
      },
      data: booking
    })

    if (updatedBooking.status === "COMPLETED") {
      incrementStock(booking.id)
    }

    revalidatePath("/booking");
    revalidatePath("/dashboard");

    return { success: `Booking with ID ${booking.id} updated successfully` };
  } catch (error) {
    console.log(error)
    return { error: "Error Updating Booking" };
  }
}
