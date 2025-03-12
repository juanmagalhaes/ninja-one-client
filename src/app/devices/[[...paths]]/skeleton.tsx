import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

type TableRowsSkeletonProps = {
  rows?: number;
};

export function TableRowsSkeleton({
  rows: length = 10,
}: TableRowsSkeletonProps) {
  return Array.from({ length }).map((_, index) => (
    <TableRow key={index} className="border-muted flex justify-between">
      <TableCell className="flex flex-col gap-2 my-0.5">
        <div className="flex gap-2 items-center font-medium leading-[100%]">
          <Skeleton className="w-5 h-5 rounded-full" />
          <Skeleton
            className={cn("h-5 w-30", {
              "w-45": Math.random() > 0.3,
              "w-40": Math.random() < 0.7,
            })}
          />
        </div>
        <div className="flex gap-2 text-muted-foreground text-xs">
          <Skeleton
            className={cn("w-32 h-4", {
              "w-36": Math.random() > 0.3,
              "w-40": Math.random() < 0.7,
            })}
          />
          <Skeleton
            className={cn("w-10 h-4", {
              "w-12": Math.random() > 0.3,
              "w-8": Math.random() < 0.7,
            })}
          />
        </div>
      </TableCell>
    </TableRow>
  ));
}
