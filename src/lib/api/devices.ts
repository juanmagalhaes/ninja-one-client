import { HttpClient } from "../http-client";

export type Device = {
  id: string;
  systemName: string;
  type: "WINDOWS" | "MAC" | "LINUX";
  hddCapacity: string;
};

// TODO make this come from env vars
const _baseUrl = "http://localhost:3000";

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
