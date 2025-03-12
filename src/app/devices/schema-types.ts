import { deviceTypeSchema } from "@/lib/api/devices";
import { z } from "zod";

export const devicePageFiltersSchema = z.object({
  systemName: z.string().optional(),
  type: deviceTypeSchema.optional(),
});

export const deviceTypeSearchSchema = z.enum([
  "ALL",
  ...deviceTypeSchema.options,
]);
export type DeviceTypeSearch = z.infer<typeof deviceTypeSearchSchema>;

export const sortBySchema = z.enum(["systemName", "hddCapacity"]);
export const orderSchema = z.enum(["asc", "desc"]);

export const devicePageSortSchema = z.object({
  sortBy: sortBySchema.nullish(),
  order: orderSchema.nullish(),
});

export type DevicePageFilters = z.infer<typeof devicePageFiltersSchema>;
export type DevicePageSortBy = z.infer<typeof sortBySchema>;
export type DevicePageSort = z.infer<typeof devicePageSortSchema>;

export const devicePageSearchParamsSchema = devicePageSortSchema.merge(
  devicePageFiltersSchema,
);

export type DevicePageSearchParams = z.infer<
  typeof devicePageSearchParamsSchema
>;
