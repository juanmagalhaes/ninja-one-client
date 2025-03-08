import { ButtonLink } from "@/components/ui/button-link";
import { Suspense } from "react";
import DeviceDataTableSection from "./data-table-section";

export default async function DevicesHome() {
  return (
    <main className="flex flex-col pt-8 px-6">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-xl leading-5 font-medium">Devices</h1>

        <ButtonLink href="/devices/add" size="lg">
          Add Device
        </ButtonLink>
      </header>

      <section className="flex">TODO - Filter Section</section>

      <Suspense fallback={<div>TODO improve this Loading...</div>}>
        <DeviceDataTableSection />
      </Suspense>
    </main>
  );
}
