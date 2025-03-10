import { Suspense } from "react";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeviceTableRows from "./table-rows";
import ModalEntry from "./_modal/entry";

export type DevicesHomeProps = {
  params: Promise<{ paths: (string | undefined)[] }>;
  searchParams: Promise<{ systemName: string }>;
};

export default async function DevicesHome(props: DevicesHomeProps) {
  const [pathname] = (await props.params).paths ?? [];
  const { systemName } = await props.searchParams;

  console.log(">>>> devices/page.tsx: ", pathname, systemName);

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

      <Suspense fallback={<div>TODO implement modal loading fallback...</div>}>
        <ModalEntry pathname={pathname} />
      </Suspense>
    </>
  );
}
