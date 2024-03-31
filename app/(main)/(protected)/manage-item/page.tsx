import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { db } from "@/lib/db";

export default async function ManageItemPage() {
  const items = await db.item.findMany();

  return (
    <div className="flex items-center py-12 justify-center">
      <Card className="w-11/12">
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={items} />
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-5</strong> of <strong>{items.length}</strong>{" "}
            items
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
