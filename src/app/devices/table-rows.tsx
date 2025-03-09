import { devicesAPI } from "@/lib/api/devices";
import { DeviceTableRow } from "./table-row";

export default async function DeviceTableRows() {
  const devices = await devicesAPI.getDevices();
  return devices.map((device) => (
    <DeviceTableRow key={device.id} device={device} />
  ));
}
