import { Metadata } from "next";
import { DeviceModal } from "../../_client/modal";

export const metadata: Metadata = {
  title: "NinjaOne - Add device",
  description: "Add a new device",
};

export default function DeviceModalAddPage() {
  return <DeviceModal />;
}
