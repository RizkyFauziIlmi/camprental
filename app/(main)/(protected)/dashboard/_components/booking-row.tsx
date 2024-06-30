"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TableCell, TableRow } from "@/components/ui/table"
import { convertFloatToIDR } from "@/lib/string"
import { cn } from "@/lib/utils"
import { Booking, BookingStatus, User } from "@prisma/client"
import { differenceInDays, formatDate } from "date-fns"
import { BsTrash } from "react-icons/bs"
import { IoCall } from "react-icons/io5"
import { MdError, MdMoreVert, MdCheck } from "react-icons/md"
import { useBoolean } from "usehooks-ts"
import { Dispatch, SetStateAction, useState, useTransition } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { deleteBooking, updateBooking } from "@/actions/booking"
import { toast } from "sonner"

interface BookingRowProps {
  booking: Booking & ({
    user: User
  });
  totalAmount: number;
  contactDialogSetTrue: () => void;
  setBookingId: Dispatch<SetStateAction<string>>;
}

export const BookingRow = ({ booking, totalAmount, contactDialogSetTrue, setBookingId }: BookingRowProps) => {
  const [status, setStatus] = useState(booking.status);
  const [isPending, startTransition] = useTransition();
  const [isPendingDelete, startTransitionDelete] = useTransition();

  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{booking.id}</div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <Select defaultValue={booking.status} disabled={isPending} onValueChange={(value) => {
          startTransition(() => {
            updateBooking(booking.id, {
              id: booking.id,
              createdAt: booking.createdAt,
              paymentUrl: booking.paymentUrl,
              penaltyAmount: booking.penaltyAmount,
              phoneNumber: booking.phoneNumber,
              startDate: booking.startDate,
              endDate: booking.endDate,
              total: booking.total,
              updatedAt: booking.updatedAt,
              userId: booking.userId,
              status: value as BookingStatus
            })
              .then((res) => {
                if (res.error) {
                  toast(res.error, {
                    icon: <MdError className="w-4 h-4" />,
                  });
                }

                if (res.success) {
                  toast(res.success, {
                    icon: <MdCheck className="w-4 h-4" />,
                  });
                }
              })
              .catch((error) => {
                console.log(error);
                toast("Something went wrong", {
                  icon: <MdError className="w-4 h-4" />,
                });
              });
          })
        }}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pick Booking Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
            <SelectItem value="NOTPAID">Not Paid</SelectItem>
            <SelectItem value="PAIDOFF">Paid Off</SelectItem>
            <SelectItem value="PENALTY">Penalty</SelectItem>
            <SelectItem value="TAKEN">Taken</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
          </SelectContent>
        </Select >
      </TableCell>
      <TableCell className="hidden md:table-cell">{formatDate(new Date(booking.createdAt), 'dd/MM/yyyy')}</TableCell>
      <TableCell className="hidden md:table-cell">{formatDate(new Date(booking.startDate), 'dd/MM/yyyy')} - {formatDate(new Date(booking.endDate), 'dd/MM/yyyy')}</TableCell>
      <TableCell className="hidden md:table-cell">
        {differenceInDays(new Date(booking.endDate), new Date())} days
      </TableCell>
      <TableCell className="text-right">{convertFloatToIDR(totalAmount)}</TableCell>
      <TableCell className="text-right">{booking.penaltyAmount ? convertFloatToIDR(booking.penaltyAmount) : convertFloatToIDR(0)}</TableCell>
      <TableCell className="text-right">{convertFloatToIDR(totalAmount + (booking.penaltyAmount ? booking.penaltyAmount : 0))}</TableCell>
      <TableCell className="text-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button size="icon" variant="outline">
              <MdMoreVert />
            </Button >
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => {
              setBookingId(booking.id)
              contactDialogSetTrue()
            }}>
              <IoCall className="w-4 h-4 mr-2" />
              Contact user
            </DropdownMenuItem  >
            <DropdownMenuItem onSelect={() => {
              startTransitionDelete(() => {
                deleteBooking(booking.id)
                  .then((res) => {
                    if (res.error) {
                      toast(res.error, {
                        icon: <MdError className="w-4 h-4" />,
                      });
                    }

                    if (res.success) {
                      toast(res.success, {
                        icon: <MdCheck className="w-4 h-4" />,
                      });
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    toast("Something went wrong", {
                      icon: <MdError className="w-4 h-4" />,
                    });
                  });
              })
            }}>
              <BsTrash className="w-4 h-4 mr-2" />
              Delete Booking
            </DropdownMenuItem >
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell >
    </TableRow >
  )
}
