import { ENV } from "@/env/public";
import { HttpClient } from "../http-client";
import { z } from "zod";

export const deviceTypeSchema = z.enum(["WINDOWS", "MAC", "LINUX"]);

export const deviceSchema = z.object({
  id: z.string(),
  systemName: z.string().nonempty("System name is required."),
  type: deviceTypeSchema,
  // The API expects HDD Capacity as a string but the value stored should be a number
  hddCapacity: z
    .string()
    .nonempty("HDD capacity is required.")
    .transform((v) => v.replace(/\D/g, "")),
});

export type Device = z.infer<typeof deviceSchema>;

const _baseUrl = ENV.API_URL;

class DevicesAPI {
  private client: HttpClient;

  constructor(baseUrl: string = _baseUrl) {
    this.client = new HttpClient(baseUrl);
  }

  getDevices(): Promise<Device[]> {
    return this.client.get<Device[]>("/devices");
  }

  getDevice(id: string): Promise<Device> {
    return this.client.get<Device>(`/devices/${id}`);
  }

  createDevice(device: Omit<Device, "id">): Promise<Device> {
    return this.client.post<Device>("/devices", device);
  }

  updateDevice(id: string, device: Omit<Device, "id">): Promise<Device> {
    return this.client.put<Device>(`/devices/${id}`, device);
  }

  deleteDevice(id: string): Promise<void> {
    return this.client.delete<void>(`/devices/${id}`);
  }
}

export const devicesAPI = new DevicesAPI();
