import { Suspense } from "react";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeviceModalEntry from "./modal";
import { DevicePageSearchParams, devicePageSearchParamsSchema } from "./types";
import DeviceTableContents from "./table-contents";
import { DevicesFiltersSection } from "./_client/filter-section";
import { TableRowsSkeleton } from "./skeleton";

export type DevicesHomeProps = {
  params: Promise<{ paths: (string | undefined)[] }>;
  searchParams: Promise<DevicePageSearchParams>;
};

/*
 * Server component. Renders device list and filter section.
 *
 * The components wrapped by Suspense are lazy loaded. The
 * request that gets fired insed them is made and then the
 * results get streamed to the client.
 */
export default async function DevicesHome(props: DevicesHomeProps) {
  const [pathname] = (await props.params).paths ?? [];
  const searchParams = devicePageSearchParamsSchema.parse(
    await props.searchParams,
  );

  return (
    <>
      <DevicesFiltersSection {...searchParams} />

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-background">
            <TableHead className="font-medium text-foreground">
              Device
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <Suspense fallback={<TableRowsSkeleton />}>
            <DeviceTableContents {...searchParams} />
          </Suspense>
        </TableBody>
      </Table>

      <Suspense fallback={<div>TODO implement modal loading fallback...</div>}>
        <DeviceModalEntry pathname={pathname} />
      </Suspense>
    </>
  );
}
