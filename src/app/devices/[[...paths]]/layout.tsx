import { PlusSign } from "@/components/svgs/plus-sign";
import { ButtonLink } from "@/components/ui/button-link";

export default function DeviceHomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col pt-8 px-6 gap-4">
      <header className="mb-2 flex justify-between items-center">
        <h1 className="text-xl leading-5 font-medium">Devices</h1>

        <ButtonLink href="/devices/add" size="lg">
          <PlusSign /> Add Device
        </ButtonLink>
      </header>

      {children}
    </main>
  );
}
