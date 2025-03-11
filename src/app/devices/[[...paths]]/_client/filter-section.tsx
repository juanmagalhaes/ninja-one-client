"use client";

import { Search } from "@/components/svgs/search";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { deviceTypeSchema } from "@/lib/api/devices";
import { SelectValue } from "@radix-ui/react-select";
import { DevicePageSearchParams } from "../types";
import { formatType } from "../utils";
import { useQueryFilterStateSync } from "./hooks";

type DevicesFiltersSectionProps = {} & DevicePageSearchParams;

export function DevicesFiltersSection(props: DevicesFiltersSectionProps) {
  const { updateQuery, ...filterState } = useQueryFilterStateSync(props);
  const selectedType = filterState.type || "ALL";

  return (
    <section className="flex gap-2">
      <div className="relative flex items-center">
        <Input
          value={filterState.systemName ?? ""}
          onChange={(e) => updateQuery({ systemName: e.target.value || null })}
          className="w-auto pl-9"
          placeholder="Search"
        />
        <Search className="absolute left-3" />
      </div>

      <Select
        value={selectedType}
        onValueChange={(v) => updateQuery({ type: v === "ALL" ? null : v })}
      >
        <SelectTrigger className="w-auto data-[placeholder]:text-foreground min-w-40">
          <SelectValue
            placeholder={`Device Type: ${formatType(selectedType)}`}
          />
          <SelectContent>
            {["ALL", ...deviceTypeSchema.options].map((type) => (
              <SelectItem key={type} value={type}>
                {`Device Type: ${formatType(type)}`}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectTrigger>
      </Select>
    </section>
  );
}
