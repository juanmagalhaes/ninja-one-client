import type { Metadata } from "next";
import DevicesPageContent from "./page-content";

export const metadata: Metadata = {
  title: "NinjaOne - Devices List",
  description: "View and manage your devices",
};

/*
 * Server component. Renders device list and filter section.
 *
 * The components wrapped by Suspense are lazy loaded. The
 * request that gets fired insed them is made and then the
 * results get streamed to the client.
 */
export default async function DevicesPage() {
  return <DevicesPageContent />;
}
