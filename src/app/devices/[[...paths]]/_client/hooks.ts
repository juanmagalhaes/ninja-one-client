import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import { DevicePageSearchParams, DevicePageSortBy, SortOrder } from "../types";

export function useQueryFilterStateSync(searchParams: DevicePageSearchParams) {
  const [queryState, updateQuery] = useQueryStates(
    {
      order: parseAsStringEnum<SortOrder>(Object.values(SortOrder)),
      sortBy: parseAsStringEnum<DevicePageSortBy>(["name", "hddCapacity"]),
      systemName: parseAsString,
      type: parseAsString,
    },
    {
      throttleMs: 200,
    },
  );

  return {
    ...searchParams,
    ...queryState,
    updateQuery,
  };
}
