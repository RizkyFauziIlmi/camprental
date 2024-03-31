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

export const editItem = async (
  values: z.infer<typeof ItemSchema>,
  itemId: string
) => {
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
    await db.item.update({
      where: {
        id: itemId,
      },
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
    return { error: "Error Updating Item" };
  }

  revalidatePath("/manage-item");
  redirect("/manage-item");
};

export const deleteItem = async (itemId: string) => {
  const session = await auth();
  const role = await currentRole();

  if (!session || role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const existingItem = await db.item.findUnique({
    where: {
      id: itemId,
    },
    select: {
      id: true,
    },
  });

  if (!existingItem) {
    return { error: "Invalid Item ID" };
  }

  try {
    await db.item.delete({
      where: {
        id: existingItem.id,
      },
    });

    revalidatePath(`/manage-item`);

    return { success: "Item Deleted Successfully" };
  } catch (error) {
    return { error: "Error Deleting Item" };
  }
};
