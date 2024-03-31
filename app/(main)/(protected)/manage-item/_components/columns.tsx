"use client";

import { Badge } from "@/components/ui/badge";
import { convertFloatToIDR } from "@/lib/string";
import { Item } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow, addDays } from "date-fns";
import Image from "next/image";
import { MdCheckCircle, MdError, MdMoreHoriz } from "react-icons/md";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiEdit, CiTrash } from "react-icons/ci";
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteItem } from "@/actions/item";
import { AiOutlineLoading } from "react-icons/ai";
import { GoTrash } from "react-icons/go";

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "imageUrl",
    header: "",
    cell: ({ row }) => {
      return (
        <Image
          src={row.getValue("imageUrl")}
          alt={row.getValue("name")}
          width={60}
          height={60}
          className="rounded-lg object-contain"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <HiOutlineChevronUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-md font-semibold">{row.getValue("name")}</div>
      );
    },
  },
  {
    accessorKey: "available",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <HiOutlineChevronUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <Badge variant={"outline"}>{row.getValue("available") ? "Available" : "Not Available"}</Badge>;
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <HiOutlineChevronUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <Badge variant={"outline"}>{row.getValue("category")}</Badge>;
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock
          <HiOutlineChevronUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-sm font-medium leading-none">
          {row.getValue("stock")} products
        </p>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <HiOutlineChevronUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-sm font-medium leading-none">
          {convertFloatToIDR(row.getValue("price"))}/day
        </p>
      );
    },
  },
  {
    accessorKey: "maxBookings",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Max Bookings
          <HiOutlineChevronUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-sm font-medium leading-none text-center">
          {row.getValue("maxBookings")} items
        </p>
      );
    },
  },
  {
    accessorKey: "maxDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Max Booking Date
          <HiOutlineChevronUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-sm font-medium leading-none text-center">
          {formatDistanceToNow(addDays(new Date(), row.getValue("maxDate")))}
        </p>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <HiOutlineChevronUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-sm font-medium leading-none text-center">
          {formatDistanceToNow(row.getValue("createdAt"))} ago
        </p>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated At
          <HiOutlineChevronUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-sm font-medium leading-none text-center">
          {formatDistanceToNow(row.getValue("updatedAt"))} ago
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: function Cell({ row }) {
      const [isAlertOpen, setIsAlertOpen] = useState(false);
      const [isPending, startTransition] = useTransition();
      const router = useRouter();
      const item = row.original;

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MdMoreHoriz className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() =>
                  router.push(`/manage-item/edit-item/${item.id}`)
                }
              >
                <CiEdit className="w-4 h-4 mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setIsAlertOpen(true)}>
                <CiTrash className="w-4 h-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialog open={isAlertOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your event and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  disabled={isPending}
                  onClick={() => setIsAlertOpen(false)}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  disabled={isPending}
                  className="bg-destructive hover:bg-destructive/80 text-white"
                  onClick={() => {
                    startTransition(() => {
                      deleteItem(item.id)
                        .then((res) => {
                          if (res.error) {
                            toast(res.error, {
                              icon: <MdError className="w-4 h-4" />,
                            });
                          } else if (res.success) {
                            toast(res.success, {
                              icon: <MdCheckCircle className="w-4 h-4" />,
                            });
                          }

                          setIsAlertOpen(false);
                        })
                        .catch((error) =>
                          toast("Something went wrong", {
                            icon: <MdError className="w-4 h-4" />,
                          })
                        );
                    });
                  }}
                >
                  {isPending ? (
                    <AiOutlineLoading className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <GoTrash className="w-4 h-4 mr-2" />
                  )}
                  {isPending ? "Deleting" : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];
