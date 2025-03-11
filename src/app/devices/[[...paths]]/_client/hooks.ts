import { parseAsString, parseAsStringEnum, useQueryState } from "nuqs";
import { DevicePageSearchParams, DevicePageSortBy, SortOrder } from "../types";

export function useQueryFilterStateSync(searchParams: DevicePageSearchParams) {
  const [order, updateOrder] = useQueryState(
    "order",
    parseAsStringEnum<SortOrder>(Object.values(SortOrder))
      .withDefault(searchParams.order)
      .withOptions({ throttleMs: 200 }),
  );
  const [sortBy, updateSortBy] = useQueryState(
    "sortBy",
    parseAsStringEnum<DevicePageSortBy>(["name", "hddCapacity"])
      .withDefault(searchParams.sortBy)
      .withOptions({ throttleMs: 200 }),
  );
  const [systemName, updateSystemName] = useQueryState(
    "systemName",
    parseAsString
      .withDefault(searchParams.systemName ?? "")
      .withOptions({ throttleMs: 200 }),
  );
  const [type, updateType] = useQueryState(
    "type",
    parseAsString
      .withDefault(searchParams.type ?? "")
      .withOptions({ throttleMs: 200 }),
  );

  return {
    order,
    updateOrder,
    sortBy,
    updateSortBy,
    systemName,
    updateSystemName,
    type,
    updateType,
  };
}
