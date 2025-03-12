"use client";

import { Device } from "@/lib/api/devices";
import { sortDevices } from "../utils";
import { useQueryFilterStateSync } from "./hooks";
import { DeviceTableRow } from "./table-row";

type TableRowsProps = {
  devices: Device[];
};

export function DeviceTableRows({ devices }: TableRowsProps) {
  const { systemName, type, sortBy, order } = useQueryFilterStateSync();

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
