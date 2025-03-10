"use client";

import { Dots } from "@/components/svgs/dots";
import { LinuxLogo } from "@/components/svgs/linux-logo";
import { MacLogo } from "@/components/svgs/mac-logo";
import { WindowsLogo } from "@/components/svgs/windows-logo";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TableCell, TableRow } from "@/components/ui/table";
import { Device } from "@/lib/api/devices";
import { capitalize } from "@/lib/case-utils";
import { useState } from "react";
import { formatHddCapacity } from "./utils";
import dynamic from "next/dynamic";

const MediaQuery = dynamic(() => import("react-responsive"), { ssr: false });

type DeviceTableRowProps = {
  device: Device;
};

const DEVICE_ICON_MAP = {
  WINDOWS: WindowsLogo,
  MAC: MacLogo,
  LINUX: LinuxLogo,
} as const;

export function DeviceTableRow({ device }: DeviceTableRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const DeviceIcon = DEVICE_ICON_MAP[device.type];

  return (
    <MediaQuery maxWidth={768}>
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
      )}
    </MediaQuery>
  );
}
