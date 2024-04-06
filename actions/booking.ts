"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

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

  if (booking.userId !== user?.id) {
    return { error: "Unauthorized" };
  }

  if (booking.status === "PAIDOFF") {
    return { error: "Cannot delete paid booking" };
  }

  try {
    // if booking is not cancelled or completed, increment item stock
    if (booking.status !== "CANCELLED" && booking.status !== "COMPLETED") {
        // increment item stock
        const orderItems = await db.orderItem.findMany({
          where: {
            bookingId: booking.id,
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

    await db.booking.delete({
      where: {
        id: bookingId,
      },
    });

    revalidatePath("/booking");

    return { success: `Booking with ID ${booking.id} deleted successfully` };
  } catch (error) {
    return { error: "Error Deleting Booking" };
  }
};
