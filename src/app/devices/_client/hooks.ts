import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import {
  DevicePageSearchParams,
  DevicePageSortBy,
  DeviceTypeSearch,
  deviceTypeSearchSchema,
  orderSchema,
  sortBySchema,
} from "../schema-types";

export function useQueryFilterStateSync(searchParams: DevicePageSearchParams) {
  const [queryState, updateQuery] = useQueryStates(
    {
      order: parseAsStringEnum<"asc" | "desc">(orderSchema.options).withDefault(
        "asc",
      ),
      sortBy: parseAsStringEnum<DevicePageSortBy>(
        sortBySchema.options,
      ).withDefault("systemName"),
      systemName: parseAsString.withDefault(""),
      type: parseAsStringEnum<DeviceTypeSearch>(
        deviceTypeSearchSchema.options,
      ).withDefault("ALL"),
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
