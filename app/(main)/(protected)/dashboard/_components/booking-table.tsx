"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog"

import { differenceInDays, formatDate } from "date-fns"

import { convertFloatToIDR, convertUsernameToAvatarFallback } from "@/lib/string";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MdEmail, MdMoreVert } from "react-icons/md"
import { IoCall } from "react-icons/io5"
import { BsTrash, BsWhatsapp } from "react-icons/bs"
import { useBoolean } from "usehooks-ts"
import { BookingRow } from "./booking-row"
import { BookingsWithOrderItemsAndItemsAndUser } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import { formatPhoneNumber } from "react-phone-number-input"
import Link from "next/link"

interface BookingTableProps {
  bookings: BookingsWithOrderItemsAndItemsAndUser;
}

export const BookingTable = ({ bookings }: BookingTableProps) => {
  const [bookingId, setBookingId] = useState("");
  const contactDialog = useBoolean(false);

  if (!bookings) {
    return <div>loading...</div>
  }

  const contactBooking = bookings.find((a) => a.id === bookingId)

  return (
    <div className="w-11/12">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Orders</CardTitle>
          <CardDescription>Recent orders from your store.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>OrderID</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Booking Date</TableHead>
                <TableHead className="hidden md:table-cell">Booking Period</TableHead>
                <TableHead className="hidden md:table-cell">Time Left</TableHead >
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Penalty</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-center">Actions</TableHead >
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => {
                const totalAmount = booking.orderItems.reduce((acc, item) => {
                  return acc + item.price * item.quantity
                }, 0)

                return <BookingRow
                  key={booking.id}
                  booking={booking}
                  totalAmount={totalAmount}
                  contactDialogSetTrue={contactDialog.setTrue}
                  setBookingId={setBookingId}
                />
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card >
      <Dialog open={contactDialog.value}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={contactBooking?.user.image ?? ""} />
                <AvatarFallback>{convertUsernameToAvatarFallback(contactBooking?.user.name ?? "")}</AvatarFallback>
              </Avatar>
              <DialogTitle>{contactBooking?.user.name}</DialogTitle>
            </div >
            <DialogDescription className="flex flex-col gap-2 pt-2">
              <Button asChild>
                <Link href={`https://wa.me/${contactBooking?.phoneNumber.replace("+", "")}`} target="_blank">
                  <BsWhatsapp className="mr-2" />
                  {formatPhoneNumber(contactBooking?.phoneNumber ?? "")}
                </Link>
              </Button >
              <Button asChild>
                <Link href={`mailto:${contactBooking?.user.email}`} target="_blank">
                  <MdEmail className="mr-2" />
                  {contactBooking?.user.email}
                </Link >
              </Button >
            </DialogDescription >
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={() => {
                contactDialog.setFalse()
              }}>
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog >
    </div>
  )
}
