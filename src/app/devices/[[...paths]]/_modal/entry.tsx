import { devicesAPI } from "@/lib/api/devices";
import { DeviceModal } from "./modal";

type ModalEntryProps = {
  pathname?: string;
};

export default async function ModalEntry({ pathname }: ModalEntryProps) {
  if (!pathname) {
    return null;
  }

  if (pathname === "add") {
    return <DeviceModal />;
  }

  const device = await devicesAPI.getDevice(pathname);

  return <DeviceModal device={device} />;
}
