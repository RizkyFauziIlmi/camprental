"use server";

import { auth } from "@/auth";
import { currentRole } from "@/lib/auth";
import { db } from "@/lib/db";
import { ItemSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const addItem = async (values: z.infer<typeof ItemSchema>) => {
  const session = await auth();
  const role = await currentRole();

  if (!session || role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  // validate form
  const validatedFields = ItemSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const {
    name,
    description,
    imageUrl,
    stock,
    category,
    available,
    price,
    maxBookings,
    maxDate,
  } = validatedFields.data;

  // add item to database
  try {
    await db.item.create({
      data: {
        name,
        description,
        imageUrl,
        stock,
        category,
        available,
        price,
        maxBookings,
        maxDate,
      },
    });
  } catch (error) {
    return { error: "Error Creating Item" };
  }

  revalidatePath("/manage-item");
  redirect("/manage-item");
};
