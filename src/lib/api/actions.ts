/*
 * Wrap the calls to the API with Server Actions so we can
 * revalidate the cache and update the UI when the data changes.
 *
 * Next.js will stream the data to the client and update the UI.
 */
"use server";

import { revalidatePath } from "next/cache";
import { Device, devicesAPI } from "./devices";

export async function createDevice(data: Omit<Device, "id">) {
  await devicesAPI.createDevice(data);
  revalidatePath("/devices");
}

export async function updateDevice(id: string, data: Omit<Device, "id">) {
  await devicesAPI.updateDevice(id, data);
  revalidatePath("/devices");
}

export async function deleteDevice(id: string) {
  await devicesAPI.deleteDevice(id);
  revalidatePath("/devices");
}
