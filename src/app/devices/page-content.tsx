import { Suspense } from "react";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeviceTableRows from "./table-rows";

export async function DevicesPageContent() {
  return (
    <>
      <section className="flex">TODO - Filter Section</section>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-background">
            <TableHead className="font-medium text-foreground">
              Device
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <Suspense fallback={<div>TODO improve this Loading...</div>}>
            <DeviceTableRows />
          </Suspense>
        </TableBody>
      </Table>
    </>
  );
}
