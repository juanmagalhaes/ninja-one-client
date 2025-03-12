"use client";

import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function DeviceEditModalSkeleton() {
  const router = useRouter();
  const onClose = useCallback(() => router.back(), [router]);

  return (
    <>
      <DialogTitle className="font-medium text-2xl leading-[100%] mb-4">
        Edit Device
      </DialogTitle>

      <VisuallyHidden asChild>
        <DialogDescription>
          Loading skeleton for device edit modal
        </DialogDescription>
      </VisuallyHidden>

      <Skeleton className="w-30 h-5" />
      <Skeleton className="w-full h-7" />

      <Skeleton className="w-30 h-5" />
      <Skeleton className="w-full h-7" />

      <Skeleton className="w-30 h-5" />
      <Skeleton className="w-full h-7" />

      <DialogFooter className="flex gap-4 justify-end mt-4">
        <Button variant="outline" type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled>Submit</Button>
      </DialogFooter>
    </>
  );
}
