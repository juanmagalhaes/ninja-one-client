import { Suspense } from "react";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DevicesFiltersSection } from "./_client/filter-section";
import { TableRowsSkeleton } from "./skeleton";
import DeviceTableContents from "./table-contents";

/*
 * Server component. Renders device list and filter section.
 *
 * The components wrapped by Suspense are lazy loaded. The
 * request that gets fired insed them is made and then the
 * results get streamed to the client.
 */
export default async function DevicesPageContent() {
  return (
    <>
      <DevicesFiltersSection />

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
            <DeviceTableContents />
          </Suspense>
        </TableBody>
      </Table>
    </>
  );
}
