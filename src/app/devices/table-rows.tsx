import { LinuxLogo } from "@/components/svgs/linux-logo";
import { MacLogo } from "@/components/svgs/mac-logo";
import { WindowsLogo } from "@/components/svgs/windows-logo";
import { TableCell, TableRow } from "@/components/ui/table";
import { devicesAPI } from "@/lib/api/devices";
import { capitalize } from "@/lib/case-utils";
import { formatHddCapacity } from "./utils";

const DEVICE_ICON_MAP = {
  WINDOWS: WindowsLogo,
  MAC: MacLogo,
  LINUX: LinuxLogo,
} as const;

export default async function DeviceTableRows() {
  const devices = await devicesAPI.getDevices();

  return (
    <>
      {devices.map((device) => {
        const DeviceIcon = DEVICE_ICON_MAP[device.type];
        return (
          <TableRow key={device.id}>
            <TableCell className="flex flex-col gap-1">
              <h3 className="flex gap-1 items-center font-medium leading-[100%]">
                <DeviceIcon /> {device.systemName}
              </h3>
              <p className="text-muted-foreground text-xs">
                {capitalize(device.type.toLowerCase())} workstation
                {" - "}
                {formatHddCapacity(device.hddCapacity)}
              </p>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}
