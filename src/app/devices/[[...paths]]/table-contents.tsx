import { devicesAPI } from "@/lib/api/devices";
import { DeviceTableRows } from "./_client/table-rows";
import { DevicePageSearchParams } from "./types";

/*
 * Entry point to load table contents on the server
 * and have it streamed to the client side.
 */
export default async function DeviceTableContents(
  props: DevicePageSearchParams,
) {
  const devices = await devicesAPI.getDevices();
  return <DeviceTableRows {...props} devices={devices} />;
}
