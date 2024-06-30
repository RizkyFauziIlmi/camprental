"use client";

import { BookingsWithOrderItemsAndItems } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { convertFloatToIDR } from "@/lib/string";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { differenceInDays, format } from "date-fns";
import { CiCalendarDate, CiLink } from "react-icons/ci";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoMdMore } from "react-icons/io";
import { MdCheckCircle, MdError, MdPayment, MdReceipt } from "react-icons/md";
import { FaPeopleCarryBox } from "react-icons/fa6";
import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { deleteBooking } from "@/actions/booking";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AiOutlineLoading } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import { generateNewPaymentLink } from "@/actions/payment";
import useScroll from "@/hooks/use-scroll";
import Image from "next/image";

interface BookingCardProps {
  booking: BookingsWithOrderItemsAndItems;
}

export const BookingCard = ({ booking }: BookingCardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { scrollTo } = useScroll();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [isDeletePending, startDeleteTransition] = useTransition();
  const [isNewLinkPending, startNewLinkTransition] = useTransition();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    scrollTo(orderId === null ? "" : orderId);
  }, [orderId, scrollTo]);

  const daysDifference = differenceInDays(booking.endDate, booking.startDate);

  const subTotal = booking.orderItems.reduce(
    (acc, orderItem) => acc + orderItem.item.price * orderItem.quantity,
    0
  );

  const subTotalDate = subTotal * daysDifference;

  const fee = 2_000;
  const total = subTotalDate + fee;

  const cardDescriptionText =
    booking.status === "PENALTY" ?
      "You have not returned the item on time, pay the penalty to continue the transaction"
      :
      booking.status === "PAIDOFF"
        ? "You have paid off this invoice, take the item now"
        : booking.status === "NOTPAID"
          ? "You have not paid off this invoice, pay now to continue the transaction"
          : booking.status === "COMPLETED"
            ? "You have completed this invoice"
            : booking.status === "CANCELLED"
              ? "You have cancelled this invoice"
              : booking.status === "TAKEN"
                ? `You have taken the items, make sure to return the item before ${format(
                  booking.endDate,
                  "PPP"
                )}`
                : "";

  return (
    <div className="w-11/12">
      <Card className="p-4" id={booking.id}>
        <CardHeader>
          <CardTitle className="scroll-m-20 text-xl font-semibold tracking-tight">
            Invoice {booking.id}{" "}
            <span className="text-sm text-muted-foreground">for </span>
            {convertFloatToIDR(booking.total)}
          </CardTitle>
          {isClient && (
            <>
              <Badge
                variant={
                  booking.status === "PAIDOFF" || booking.status === "COMPLETED"
                    ? "success"
                    : booking.status === "NOTPAID"
                      ? "secondary"
                      : booking.status === "CANCELLED" || booking.status === "PENALTY"
                        ? "destructive"
                        : "default"
                }
                className={"w-fit"}
              >
                {booking.status}
              </Badge>
              <CardDescription>{cardDescriptionText}</CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 items-center text-sm text-muted-foreground">
            <CiCalendarDate className="w-4 h-4" />
            <p>{format(booking.startDate, "PPP")}</p>
            <p> until </p>
            <p>{format(booking.endDate, "PPP")}</p>
          </div>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-center">Order Quantity</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {booking.orderItems.map((orderItem) => (
                <TableRow key={orderItem.id}>
                  <TableCell>
                    <Image
                      src={orderItem.item.imageUrl}
                      alt={orderItem.item.name}
                      className="w-10 h-10 rounded-lg object-contain"
                      width={30}
                      height={30}
                    />
                  </TableCell>
                  <TableCell>{orderItem.item.name}</TableCell>
                  <TableCell>
                    {convertFloatToIDR(orderItem.item.price)}
                  </TableCell>
                  <TableCell className="text-center">
                    {orderItem.quantity}
                  </TableCell>
                  <TableCell className="text-right">
                    {convertFloatToIDR(
                      orderItem.item.price * orderItem.quantity
                    )}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Application Tax</TableCell>
                <TableCell>{convertFloatToIDR(fee)}</TableCell>
                <TableCell className="text-center">1</TableCell>
                <TableCell className="text-right">
                  {convertFloatToIDR(fee)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  {daysDifference} {daysDifference <= 1 ? "day" : "days"}
                </TableCell>
                <TableCell></TableCell>
                <TableCell className="text-center">x{daysDifference}</TableCell>
                <TableCell className="text-right font-bold">
                  {convertFloatToIDR(total)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="space-x-2">
          {booking.status === "PAIDOFF" ? (
            <Button asChild>
              <Link
                href="https://maps.app.goo.gl/3araot7QVNrhHNuq6"
                target="_blank"
              >
                <FaPeopleCarryBox className="w-4 h-4 mr-2" />
                Pick Up Now
              </Link>
            </Button>
          ) : booking.status === "NOTPAID" ? (
            <Button
              onClick={() => router.push(booking.paymentUrl)}
              disabled={booking.status !== "NOTPAID"}
            >
              <MdPayment className="w-4 h-4 mr-2" />
              Pay Now
            </Button>
          ) : booking.status === "PENALTY" ? (
            <Button
              onClick={() => router.push(booking.paymentUrl)}
              variant={"destructive"}
              disabled={booking.status !== "PENALTY"}
            >
              <MdPayment className="w-4 h-4 mr-2" />
              Pay Penalty
            </Button>
          ) : (
            <Button asChild>
              <Link href={`/invoice/${booking.id}`}>
                <MdReceipt className="w-4 h-4 mr-2" />
                View Invoice
              </Link>
            </Button>
          )}
          {booking.status === "NOTPAID" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"} size={"icon"}>
                  <IoMdMore />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {booking.status === "NOTPAID" && (
                  <DropdownMenuItem
                    onSelect={() => {
                      startNewLinkTransition(() => {
                        generateNewPaymentLink(booking.id)
                          .then((res) => {
                            if (res.success) {
                              toast(res.success, {
                                icon: <MdCheckCircle className="w-4 h-4" />,
                              });
                            }

                            if (res.error) {
                              toast(res.error, {
                                icon: <MdError className="w-4 h-4" />,
                              });
                            }
                          })
                          .catch((err) => {
                            toast("Something went wrong", {
                              icon: <MdError className="w-4 h-4" />,
                            });
                          });
                      });
                    }}
                  >
                    {isNewLinkPending ? (
                      <AiOutlineLoading className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <CiLink className="w-4 h-4 mr-2" />
                    )}
                    {isNewLinkPending
                      ? "Generating New Link"
                      : "Generate New Payment Link"}
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onSelect={() => setIsAlertOpen(true)}>
                  <GoTrash className="w-4 h-4 mr-2" />
                  Delete Booking
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </CardFooter>
      </Card>
      <AlertDialog open={isAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              booking and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isDeletePending}
              onClick={() => setIsAlertOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeletePending}
              className="bg-destructive hover:bg-destructive/80 text-white"
              onClick={() => {
                startDeleteTransition(() => {
                  deleteBooking(booking.id)
                    .then((res) => {
                      if (res.success) {
                        toast(res.success, {
                          icon: <MdCheckCircle className="w-4 h-4" />,
                        });
                      }

                      if (res.error) {
                        toast(res.error, {
                          icon: <MdError className="w-4 h-4" />,
                        });
                      }
                    })
                    .catch((err) => {
                      toast("Something went wrong", {
                        icon: <MdError className="w-4 h-4" />,
                      });
                    });
                });
              }}
            >
              {isDeletePending ? (
                <AiOutlineLoading className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <GoTrash className="w-4 h-4 mr-2" />
              )}
              {isDeletePending ? "Deleting" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
