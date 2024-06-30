import { createPenaltyPayment } from "@/actions/payment";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { snap } from "@/lib/midtrans";
import { BookingsWithOrderItemsAndItems } from "@/types";

const bookingPipeline = async (userId?: string, isAdmin: boolean = false) => {
  let bookings;

  if (!isAdmin) {
    bookings = await db.booking.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        status: true,
        endDate: true,
        penaltyAmount: true,
      },
    });
  } else {
    bookings = await db.booking.findMany({
      select: {
        id: true,
        status: true,
        endDate: true,
        penaltyAmount: true,
      },
    })
  }

  for (const booking of bookings) {
    if (booking.status === "NOTPAID" && booking.endDate < new Date()) {
      // if booking is not paid and end date is passed, set status to CANCELLED
      await db.booking.update({
        where: {
          id: booking.id,
        },
        data: {
          status: "CANCELLED",
        },
      });

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
    } else if (booking.status === "TAKEN" && booking.endDate < new Date() && booking.penaltyAmount === null) {
      // if booking is taken and end date is passed, set PENALTY
      createPenaltyPayment(booking.id);
    } else {
      try {
        if (
          booking.status !== "CANCELLED" &&
          booking.status !== "COMPLETED" &&
          booking.status !== "PENALTY"
        ) {
          const res = await snap.transaction.status(booking.id);
          if (res.transaction_status === "settlement") {
            if (booking.endDate < new Date()) {
              await db.booking.update({
                where: {
                  id: booking.id,
                },
                data: {
                  status: "COMPLETED",
                },
              });

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
            } else {
              if (booking.status !== "TAKEN") {
                await db.booking.update({
                  where: {
                    id: booking.id,
                  },
                  data: {
                    status: "PAIDOFF",
                  },
                });
              }
            }
          }
        }
      } catch (err) {
        if (
          booking.status !== "CANCELLED" &&
          booking.status !== "COMPLETED"
        ) {
          await db.booking.update({
            where: {
              id: booking.id,
            },
            data: {
              status: "NOTPAID",
            },
          });
        }
      }
    }
  }
}

export const getAllBookingsCurrentUser = async () => {
  try {
    const user = await currentUser();

    bookingPipeline(user?.id, false);

    let bookings = await db.booking.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        orderItems: {
          include: {
            item: true,
          },
        },
      },
      orderBy: [
        {
          updatedAt: "desc",
        },
        {
          startDate: "asc",
        },
      ],
    });

    return bookings as BookingsWithOrderItemsAndItems[];
  } catch (err) {
    return null;
  }
};

export const getAllBookings = async () => {
  try {
    bookingPipeline(undefined, true);

    let bookings = await db.booking.findMany({
      include: {
        orderItems: {
          include: {
            item: true,
          },
        },
        user: true,
      },
      orderBy: [
        {
          updatedAt: "desc",
        },
        {
          startDate: "asc",
        },
      ],
    });

    return bookings;
  } catch (err) {
    return null;
  }
}
