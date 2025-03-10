import { devicesAPI } from "@/lib/api/devices";
import { DeviceModal } from "../modal";

type EditModalPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditModalPage({ params }: EditModalPageProps) {
  const { id } = await params;
  const device = await devicesAPI.getDevice(id);
  return <DeviceModal device={device} />;
}
