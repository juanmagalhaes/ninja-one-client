"use client";

import { Dots } from "@/components/svgs/dots";
import { LinuxLogo } from "@/components/svgs/linux-logo";
import { MacLogo } from "@/components/svgs/mac-logo";
import { WindowsLogo } from "@/components/svgs/windows-logo";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TableCell, TableRow } from "@/components/ui/table";
import { deleteDevice } from "@/lib/api/actions";
import { Device } from "@/lib/api/devices";
import { capitalize } from "@/lib/case-utils";
import dynamic from "next/dynamic";
import { useState } from "react";
import { formatHddCapacity } from "../utils";
import { toast } from "sonner";
import { useProgressIndicator } from "@/components/ui/progress-indicator";
import { Loader2 } from "lucide-react";

const MediaQuery = dynamic(() => import("react-responsive"), { ssr: false });

type DeviceTableRowProps = {
  device: Device;
};

const DEVICE_ICON_MAP = {
  WINDOWS: WindowsLogo,
  MAC: MacLogo,
  LINUX: LinuxLogo,
} as const;

const twMdBreakpoint = 768;

export function DeviceTableRow({ device }: DeviceTableRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const DeviceIcon = DEVICE_ICON_MAP[device.type];
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { setProgressVisible, isProgressing } = useProgressIndicator();

  async function handleDelete() {
    try {
      setProgressVisible(true);
      await deleteDevice(device.id);
      toast.success("Device deleted successfully.");
    } catch (error) {
      toast.error("There was an error deleting the device.");
      console.error(error);
    } finally {
      setProgressVisible(false);
      setDeleteDialogOpen(false);
    }
  }

  return (
    <MediaQuery maxWidth={twMdBreakpoint}>
      {(isMobile) => (
        <TableRow
          key={device.id}
          className="border-muted flex justify-between"
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
        >
          <TableCell className="flex flex-col gap-1 my-0.5">
            <h3 className="flex gap-1 items-center font-medium leading-[100%]">
              <DeviceIcon /> {device.systemName}
            </h3>
            <p className="text-muted-foreground text-xs">
              {capitalize(device.type.toLowerCase())} workstation
              {" - "}
              {formatHddCapacity(device.hddCapacity)}
            </p>
          </TableCell>
          {(isMobile || isHovered) && (
            <TableCell className="flex gap-2 items-center">
              <Popover>
                <PopoverTrigger>
                  <Dots className="cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  className="flex flex-col items-start max-w-30 py-2 px-0"
                >
                  <ButtonLink
                    forwardSearch
                    variant="link"
                    className="text-foreground"
                    href={`/devices/${device.id}`}
                  >
                    Edit
                  </ButtonLink>

                  <Button
                    variant="link"
                    className="text-destructive"
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    Delete
                  </Button>
                </PopoverContent>
              </Popover>
            </TableCell>
          )}

          <Dialog
            open={deleteDialogOpen}
            onOpenChange={() => setDeleteDialogOpen(false)}
          >
            <DialogContent>
              <DialogHeader className="mb-4">
                <DialogTitle className="font-medium text-2xl leading-[100%]">
                  Delete device?
                </DialogTitle>

                <DialogDescription className="text-foreground font-medium my-4">
                  You are about to delete the device{" "}
                  <strong>{device.systemName}</strong>. This action cannot be
                  undone.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <Button
                  disabled={isProgressing}
                  variant="outline"
                  className="text-foreground"
                  onClick={() => setDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  disabled={isProgressing}
                  variant="destructive"
                  onClick={handleDelete}
                >
                  {isProgressing && <Loader2 className="animate-spin" />}
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TableRow>
      )}
    </MediaQuery>
  );
}
