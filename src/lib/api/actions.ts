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
