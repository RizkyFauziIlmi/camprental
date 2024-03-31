import { db } from "@/lib/db";
import { EditItemForm } from "../_components/edit-item-form";

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
    return null
  }

  return <EditItemForm item={item} />;
}
