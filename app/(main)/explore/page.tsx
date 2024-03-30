import { db } from "@/lib/db";
import { ExploreContent } from "./_components/explore-content";
import { ExploreHeader } from "./_components/explore-header";
import { ExplorePagination } from "./_components/explore-pagination";
import { ExploreRecommendation } from "./_components/explore-recommendation";
import { ExploreFooter } from "./_components/explore-footer";

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const sortMethod = (searchParams["sort"] as string) || "all";
  const search = (searchParams["search"] as string) || "";
  const page = parseInt(searchParams["page"] as string) || 1;

  const pageSize = 8;
  const skip = (page - 1) * pageSize;

  const items = await db.item.findMany({
    skip,
    take: pageSize,
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    orderBy: {
      createdAt: sortMethod === "new" ? "desc" : undefined,
    },
  });

  const itemsCount = await db.item.count({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    orderBy: {
      createdAt: sortMethod === "new" ? "desc" : undefined,
    },
  });

  const totalPages = Math.ceil(itemsCount / pageSize);

  return (
    <div>
      <div className="h-[80vh] bg-explore-banner bg-center bg-cover md:bg-contain -mt-16"></div>
      <div className="flex flex-col items-center gap-6 mb-4">
        <ExploreHeader />
        <ExploreContent items={items} />
        <ExplorePagination totalPages={totalPages} />
        <ExploreRecommendation items={items} />
        <ExploreFooter />
      </div>
    </div>
  );
}
