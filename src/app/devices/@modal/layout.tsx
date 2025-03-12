import { DialogContent } from "@/components/ui/dialog";
import { Modal } from "@/components/ui/modal";

export default function DeviceModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Modal>
      <DialogContent>{children}</DialogContent>
    </Modal>
  );
}
