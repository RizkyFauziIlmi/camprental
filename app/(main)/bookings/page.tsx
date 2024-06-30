import { getAllBookingsCurrentUser } from "@/data/booking";
import { BookingCard } from "./_components/booking-card";
import { BookingsWithOrderItemsAndItems } from "@/types";
import { redirect } from "next/navigation";

export default async function BookingsPage() {
  const bookings = await getAllBookingsCurrentUser();

  if (!bookings) {
    return <h1>no bookings</h1>;
  }

  return (
    <div className="py-6 flex flex-col gap-4 items-center">
      {bookings.length === 0
        ? null
        : bookings.map((booking) => {
          return (
            <BookingCard
              key={booking.id}
              booking={booking as BookingsWithOrderItemsAndItems}
            />
          );
        })}
    </div>
  );
}
