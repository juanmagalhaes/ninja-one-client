import { deviceTypeSchema } from "@/lib/api/devices";
import { z } from "zod";

export const devicePageFiltersSchema = z.object({
  systemName: z.string().optional(),
  type: deviceTypeSchema.optional(),
});

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

const sortBySchema = z.enum(["name", "hddCapacity", ""]).optional().default("");
const orderSchema = z.nativeEnum(SortOrder).optional().default(SortOrder.ASC);

export const devicePageSortSchema = z.object({
  sortBy: sortBySchema.nullable(),
  order: orderSchema.nullable(),
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
