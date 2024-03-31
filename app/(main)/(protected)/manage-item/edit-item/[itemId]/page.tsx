import { db } from "@/lib/db";
import { EditItemForm } from "../_components/edit-item-form";
import { redirect } from "next/navigation";

export default async function EditItemId({
  params,
}: {
  params: { itemId: string };
}) {
  const item = await db.item.findUnique({
    where: {
      id: params.itemId,
    },
  });

  if (!item) {
    return redirect("/manage-item");
  }

  return <EditItemForm item={item} />;
}
