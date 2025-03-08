import { devicesAPI } from "@/lib/api/devices";

export default async function DeviceDataTableSection() {
  const devices = await devicesAPI.getDevices();

  return (
    <section>
      {devices.map((it) => (
        <p key={it.id}>{it.systemName}</p>
      ))}
    </section>
  );
}
