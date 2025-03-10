import { devicesAPI } from "@/lib/api/devices";
import { DeviceModal } from "./_client/modal";

type ModalEntryProps = {
  pathname?: string;
};

export default async function DeviceModalEntry({ pathname }: ModalEntryProps) {
  if (!pathname) {
    return null;
  }

  if (pathname === "add") {
    return <DeviceModal />;
  }

  const device = await devicesAPI.getDevice(pathname);

  return <DeviceModal device={device} />;
}
