"use client";

import { Device } from "@/lib/api/devices";
import { LinuxLogo } from "@/components/svgs/linux-logo";
import { MacLogo } from "@/components/svgs/mac-logo";
import { WindowsLogo } from "@/components/svgs/windows-logo";
import { TableCell, TableRow } from "@/components/ui/table";
import { capitalize } from "@/lib/case-utils";
import { formatHddCapacity } from "./utils";
import { useState } from "react";
import { Dots } from "@/components/svgs/dots";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ButtonLink } from "@/components/ui/button-link";
import { Button } from "@/components/ui/button";

type DeviceTableRowProps = {
  device: Device;
};

const DEVICE_ICON_MAP = {
  WINDOWS: WindowsLogo,
  MAC: MacLogo,
  LINUX: LinuxLogo,
} as const;

export function DeviceTableRow({ device }: DeviceTableRowProps) {
  // TODO for mobile mouse hover is not possible, make it always visible
  const [isHovered, setIsHovered] = useState(false);
  const DeviceIcon = DEVICE_ICON_MAP[device.type];

  return (
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
      {isHovered && (
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
                variant="link"
                className="text-foreground"
                href={`/devices/${device.id}`}
              >
                Edit
              </ButtonLink>

              <Button variant="link" className="text-destructive">
                Delete
              </Button>
            </PopoverContent>
          </Popover>
        </TableCell>
      )}
    </TableRow>
  );
}
