import { ItemCategory } from "@prisma/client";
import { z } from "zod";

export const ItemSchema = z.object({
  name: z.string({ required_error: "Product name is required!" }).min(1),
  description: z
    .string({ required_error: "Product description is required!" })
    .min(1),
  price: z.number().min(1000),
  category: z.nativeEnum(ItemCategory),
  imageUrl: z.string({ required_error: "Image is required!" }).min(1),
  stock: z.number({ required_error: "Stock is required!" }),
  maxBookings: z.number({ required_error: "Max bookings is reuqired!" }),
  maxDate: z.number({ required_error: "Max date is required!" }),
  available: z.boolean(),
});
