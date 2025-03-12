"use client";

import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import { useMount } from "react-use";
import {
  DeviceTypeSearch,
  deviceTypeSearchSchema,
  orderSchema,
  SortBy,
  sortBySchema,
} from "../schema-types";

export function useQueryFilterStateSync() {
  const [queryState, updateQuery] = useQueryStates(
    {
      order: parseAsStringEnum<"asc" | "desc">(orderSchema.options).withDefault(
        "asc",
      ),
      sortBy: parseAsStringEnum<SortBy>(sortBySchema.options).withDefault(
        "systemName",
      ),
      systemName: parseAsString.withDefault(""),
      type: parseAsStringEnum<DeviceTypeSearch>(
        deviceTypeSearchSchema.options,
      ).withDefault("ALL"),
    },
    {
      throttleMs: 200,
    },
  );

  useMount(() => {
    // After the initial render, sync the query state with the URL
    // This should remove from the URL any query params with invalid values.
    updateQuery(queryState);
  });

  return {
    ...queryState,
    updateQuery,
  };
}
