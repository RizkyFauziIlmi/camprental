import { Booking, Item, ItemCategory, OrderItem, Prisma } from "@prisma/client";

export type BookingWithOrderItemsAndItems = Booking & {
  orderItems: ({
    item: Item;
  } & OrderItem)[];
};