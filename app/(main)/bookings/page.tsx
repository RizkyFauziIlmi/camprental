import { getAllBookings } from "@/data/booking";
import { BookingCard } from "./_components/booking-card";
import { BookingWithOrderItemsAndItems } from "@/types";
import { redirect } from "next/navigation";

export default async function BookingsPage() {
  const bookings = await getAllBookings();

  if (!bookings) {
    return redirect("/explore");
  }

  return (
    <div className="py-6 flex flex-col gap-4 items-center">
      {bookings.length === 0
        ? null
        : bookings.map((booking) => {
            return (
              <BookingCard
                key={booking.id}
                booking={booking as BookingWithOrderItemsAndItems}
              />
            );
          })}
    </div>
  );
}
