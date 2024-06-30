import { getAllBookings } from "@/data/booking"
import { BookingTable } from "./_components/booking-table";

export default async function DashboardPage() {
  const bookings = await getAllBookings();

  return (
    <div className="flex items-center py-12 justify-center">
      <BookingTable bookings={bookings} />
    </div >
  )
}
