import { registerNetworkDelayDebugger } from "@/lib/utils";
import { DeviceModal } from "../../_client/modal";
import { devicesAPI } from "@/lib/api/devices";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NinjaOne - Edit device",
  description: "Edit an existing device",
};

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
