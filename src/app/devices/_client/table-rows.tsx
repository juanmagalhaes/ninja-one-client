"use client";

import { Device } from "@/lib/api/devices";
import { sortDevices } from "../utils";
import { useQueryFilterStateSync } from "./hooks";
import { DeviceTableRow } from "./table-row";
import { Ghost } from "@/components/svgs/ghost";

type TableRowsProps = {
  devices: Device[];
};

export function DeviceTableRows({ devices }: TableRowsProps) {
  const { systemName, type, sortBy, order } = useQueryFilterStateSync();

  if (devices.length === 0) {
    return (
      <tr>
        <td
          colSpan={5}
          className="text-2xl font-bold text-muted-foreground italic py-20 flex flex-col gap-4 justify-center items-center"
        >
          Nothing to see here, boss!
          <Ghost className="w-20 h-20" />
        </td>
      </tr>
    );
  }

  let results = [...devices];

  if (systemName || type) {
    results = results.filter((device) => {
      // TODO make this a fuzzy search
      if (
        systemName &&
        !device.systemName.toLowerCase().includes(systemName.toLowerCase())
      )
        return false;

      if (type !== "ALL" && device.type !== type) return false;

      return true;
    });
  }

  if (sortBy) {
    results = sortDevices(results, { sortBy, order });
  }

  return results.map((device) => (
    <DeviceTableRow key={device.id} device={device} />
  ));
}
