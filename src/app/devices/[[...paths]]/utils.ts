import { Device } from "@/lib/api/devices";
import { DevicePageSort } from "./types";
import { capitalize } from "@/lib/case-utils";

export function formatHddCapacity(gb: number | string): string {
  gb = typeof gb === "string" ? Number(gb) : gb;

  if (gb >= 1024) {
    return `${Number(gb / 1024).toFixed(2)} TB`;
  }

  return `${gb} GB`;
}

export function sortDevices(devices: Device[], sort: DevicePageSort): Device[] {
  const order = sort.order ?? "asc";
  const sortBy = sort.sortBy ?? "systemName";

  return [...devices].sort((a, b) => {
    let valueA: string | number = a.systemName.toLowerCase();
    let valueB: string | number = b.systemName.toLowerCase();

    if (sortBy === "hddCapacity") {
      valueA = parseInt(a.hddCapacity, 10) || 0;
      valueB = parseInt(b.hddCapacity, 10) || 0;
    }

    if (valueA < valueB) return order === "asc" ? -1 : 1;
    if (valueA > valueB) return order === "asc" ? 1 : -1;

    return 0;
  });
}

export function formatType(type: string) {
  return capitalize(type.toLowerCase());
}
