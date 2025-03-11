"use client";

import { Device } from "@/lib/api/devices";
import { DevicePageSearchParams } from "../types";
import { sortDevices } from "../utils";
import { DeviceTableRow } from "./table-row";
import { useQueryFilterStateSync } from "./hooks";

type TableRowsProps = {
  devices: Device[];
} & DevicePageSearchParams;

export function DeviceTableRows({ devices, ...props }: TableRowsProps) {
  const { systemName, type, sortBy, order } = useQueryFilterStateSync(props);

  let results = [...devices];

  if (systemName || type) {
    results = results.filter((device) => {
      // TODO make this a fuzzy search
      if (
        systemName &&
        !device.systemName.toLowerCase().includes(systemName.toLowerCase())
      )
        return false;

      if (type && device.type !== type) return false;

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
