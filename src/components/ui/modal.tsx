"use client";

import { useRouter } from "next/navigation";
import { Dialog } from "./dialog";
import { useCallback } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export function Modal(
  props: React.ComponentProps<typeof DialogPrimitive.Root>,
) {
  const router = useRouter();
  const onClose = useCallback(() => router.back(), [router]);

  return <Dialog open onOpenChange={onClose} {...props} />;
}
