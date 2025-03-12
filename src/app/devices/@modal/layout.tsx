import { Modal } from "@/components/ui/modal";

export default function DeviceModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Modal>{children}</Modal>;
}
