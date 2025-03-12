import { registerNetworkDelayDebugger } from "@/lib/utils";
import { DeviceModal } from "../../_client/modal";
import { devicesAPI } from "@/lib/api/devices";

type DeviceModalEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DeviceModalEditPage({
  params,
}: DeviceModalEditPageProps) {
  await registerNetworkDelayDebugger();

  const { id } = await params;
  const device = await devicesAPI.getDevice(id);
  return <DeviceModal device={device} />;
}
