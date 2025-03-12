import DevicesPageContent from "./page-content";

/*
 * default.tsx for the devices page.
 *
 * This is a necessary convention in next.js app router when using parallel routes.
 */
export default async function DefaultDevicesPage() {
  return <DevicesPageContent />;
}
