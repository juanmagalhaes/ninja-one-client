"use client";

import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useProgressIndicator } from "@/components/ui/progress-indicator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createDevice, updateDevice } from "@/lib/api/actions";
import { Device, deviceSchema, deviceTypeSchema } from "@/lib/api/devices";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { formatType } from "../utils";

const formSchema = deviceSchema.omit({ id: true });

type DeviceModalProps = {
  device?: Device;
};

/*
 * The DeviceModal component is used to create or edit a device.
 */
export function DeviceModal({ device }: DeviceModalProps) {
  const router = useRouter();
  const onClose = useCallback(() => router.back(), [router]);

  const { setProgressVisible } = useProgressIndicator();

  const { id, ...defaultValues } = device ?? {};

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      systemName: "",
      hddCapacity: "",
      ...defaultValues,
    },
  });

  const disabled =
    form.formState.isSubmitting ||
    !form.formState.isValid ||
    !form.formState.isDirty;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (disabled) return;

    try {
      setProgressVisible(true);

      if (id) {
        await updateDevice(id, values);
        onClose();
        toast.success("Device updated successfully.");
        return;
      }

      await createDevice(values);
      onClose();
      toast.success("Device created successfully.");
    } catch (error) {
      toast.error("There was an error creating the device.");
      console.error(error);
    } finally {
      setProgressVisible(false);
    }
  }

  return (
    <>
      <DialogHeader className="mb-4">
        <DialogTitle className="font-medium text-2xl leading-[100%]">
          {id ? "Edit Device" : "Add device"}
        </DialogTitle>

        <VisuallyHidden asChild>
          <DialogDescription>
            {id
              ? `Edit the device details for ${device?.systemName}. Click submit when you are done`
              : "Create a new device. Click submit when you are done"}
          </DialogDescription>
        </VisuallyHidden>
      </DialogHeader>

      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="systemName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>System name *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Device type *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger id="typeSelect">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent id="typeSelectPopover">
                    {deviceTypeSchema.options.map((type) => (
                      <SelectItem key={type} value={type} id={`option-${type}`}>
                        {formatType(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hddCapacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>HDD capacity (GB) *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.replace(/\D/g, ""))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter className="flex gap-4 justify-end mt-4">
            <Button
              disabled={form.formState.isSubmitting}
              variant="outline"
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button disabled={disabled}>
              {form.formState.isSubmitting && (
                <Loader2 className="animate-spin" />
              )}
              Submit
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
