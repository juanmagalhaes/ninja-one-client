"use client";

import { Ghost } from "@/components/svgs/ghost";
import { Button } from "@/components/ui/button";
import { useMount } from "react-use";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useMount(() => {
    // Send the error to a service like sentry, bugsnag, etc.
    console.error("Global Error: ", error);
  });

  return (
    <html>
      <body>
        <main className="h-screen w-screen items-center justify-center flex flex-col gap-12 bg-secondary/30 p-6 text-center">
          <h2 className="font-bold text-3xl">
            Whoops! Something went very wrong!
          </h2>

          <Ghost className="w-70 h-70" />

          <Button
            size="lg"
            className="font-bold text-lg px-14 py-7"
            onClick={() => reset()}
          >
            Go back to the home page
          </Button>
        </main>
      </body>
    </html>
  );
}
