"use client";

import { Device } from "@/lib/api/devices";
import { DeviceTableRow } from "./table-row";
import { DevicePageSearchParams, DevicePageSortBy, SortOrder } from "../types";
import { parseAsString, parseAsStringEnum, useQueryState } from "nuqs";
import { sortDevices } from "../utils";

type TableRowsProps = {
  devices: Device[];
} & DevicePageSearchParams;

export function DeviceTableRows({ devices, ...props }: TableRowsProps) {
  const [order] = useQueryState(
    "order",
    parseAsStringEnum<SortOrder>(Object.values(SortOrder)).withDefault(
      props.order,
    ),
  );
  const [sortBy] = useQueryState(
    "sortBy",
    parseAsStringEnum<DevicePageSortBy>(["name", "hddCapacity"]).withDefault(
      props.sortBy,
    ),
  );

  const [sytemName] = useQueryState(
    "systemName",
    parseAsString.withDefault(props.systemName ?? ""),
  );
  const [type] = useQueryState(
    "type",
    parseAsString.withDefault(props.type ?? ""),
  );

  let results = [...devices];

  if (sytemName || type) {
    results = results.filter((device) => {
      if (sytemName && !device.systemName.includes(sytemName)) return false;
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
