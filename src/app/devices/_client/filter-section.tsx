"use client";

import { Search } from "@/components/svgs/search";
import { TurningArrows } from "@/components/svgs/turning-arrows";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { useState } from "react";
import { toast } from "sonner";
import { DeviceTypeSearch, deviceTypeSearchSchema } from "../schema-types";
import { formatType } from "../utils";
import { useQueryFilterStateSync } from "./hooks";

const sortOptions = [
  {
    sortBy: "systemName",
    order: "asc",
    label: "Sort by: System Name (Ascending)",
  },
  {
    sortBy: "systemName",
    order: "desc",
    label: "Sort by: System Name (Descending)",
  },
  {
    sortBy: "hddCapacity",
    order: "asc",
    label: "Sort by: HDD Capacity (Ascending)",
  },
  {
    sortBy: "hddCapacity",
    order: "desc",
    label: "Sort by: HDD Capacity (Descending)",
  },
] as const;

export function DevicesFiltersSection() {
  const { updateQuery, ...filterState } = useQueryFilterStateSync();
  const [iconRotation, setIconRotation] = useState(0);

  function handleResetFilters() {
    setIconRotation((prev) => prev + 360);
    updateQuery(null);
    toast("Filters have been reset", {
      duration: 1200,
    });
  }

  return (
    <section className="flex gap-2" aria-label="Filter">
      <div className="relative flex items-center">
        <Input
          value={filterState.systemName}
          onChange={(e) => updateQuery({ systemName: e.target.value || null })}
          name="search"
          className="w-auto pl-9"
          placeholder="Search"
        />
        <Search className="absolute left-3" />
      </div>

      <Select
        value={filterState.type}
        onValueChange={(type: DeviceTypeSearch) => updateQuery({ type })}
      >
        <SelectTrigger
          id="typeSelectorFilter"
          className="w-auto data-[placeholder]:text-foreground min-w-min"
        >
          <SelectValue
            placeholder={`Device Type: ${formatType(filterState.type)}`}
          />
          <SelectContent>
            {deviceTypeSearchSchema.options.map((type) => (
              <SelectItem key={type} value={type}>
                {`Device Type: ${formatType(type)}`}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectTrigger>
      </Select>

      <Select
        value={`${filterState.sortBy}.${filterState.order}`}
        onValueChange={(v) => {
          const [sortBy, order] = v.split(".");
          updateQuery({
            sortBy: sortBy as "systemName" | "hddCapacity",
            order: order as "asc" | "desc",
          });
        }}
      >
        <SelectTrigger
          id="sortSelectorFilter"
          className="w-auto data-[placeholder]:text-foreground min-w-min"
        >
          <SelectValue placeholder={sortOptions[0].label} />
          <SelectContent>
            {sortOptions.map((sortOption) => (
              <SelectItem
                key={sortOption.label}
                value={`${sortOption.sortBy}.${sortOption.order}`}
              >
                {sortOption.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectTrigger>
      </Select>

      <Button
        variant="ghost"
        onClick={handleResetFilters}
        className="ml-auto cursor-pointer"
      >
        <TurningArrows
          style={{ transform: `rotate(${iconRotation}deg)` }}
          className="w-8 h-8 transition-transform duration-500 ease-in-out"
        />
      </Button>
    </section>
  );
}
