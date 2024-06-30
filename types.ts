import { Booking, Item, ItemCategory, OrderItem, Prisma, User } from "@prisma/client";
import { getAllBookings } from "./data/booking";

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T

export type BookingsWithOrderItemsAndItems = Booking & {
  orderItems: ({
    item: Item;
  } & OrderItem)[];
};

export type BookingsWithOrderItemsAndItemsAndUser = ThenArg<ReturnType<typeof getAllBookings>>
