import { Suspense } from "react";
import DeviceDataTableSection from "./data-table-section";

// TODO add search params that will be the current selected filters
export default async function DevicesHome() {
  return (
    <>
      <section className="flex">TODO - Filter Section</section>

      <Suspense fallback={<div>TODO improve this Loading...</div>}>
        <DeviceDataTableSection />
      </Suspense>
    </>
  );
}
