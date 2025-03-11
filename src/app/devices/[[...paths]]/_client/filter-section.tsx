"use client";

import { Search } from "@/components/svgs/search";
import { Input } from "@/components/ui/input";
import { DevicePageSearchParams } from "../types";
import { useQueryFilterStateSync } from "./hooks";

type DevicesFiltersSectionProps = {} & DevicePageSearchParams;

export function DevicesFiltersSection(props: DevicesFiltersSectionProps) {
  const filterState = useQueryFilterStateSync(props);

  return (
    <section className="flex">
      <div className="relative flex items-center">
        <Input
          value={filterState.systemName}
          onChange={(e) => filterState.updateSystemName(e.target.value)}
          className="w-70 pl-9"
          placeholder="Search"
        />
        <Search className="absolute left-3" />
      </div>
    </section>
  );
}
