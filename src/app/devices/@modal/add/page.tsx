"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createDevice } from "@/lib/api/actions";
import { deviceSchema, deviceTypeSchema } from "@/lib/api/devices";
import { capitalize } from "@/lib/case-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = deviceSchema.omit({ id: true });

export default function DeviceModal() {
  const router = useRouter();
  const onClose = useCallback(() => router.back(), [router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      systemName: "",
      hddCapacity: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createDevice(values);
      onClose();
      toast.success("Device created successfully.");
    } catch (error) {
      toast.error("There was an error creating the device.");
      console.error(error);
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-medium text-2xl leading-[100%]">
            Add Device
          </DialogTitle>

          <VisuallyHidden asChild>
            <DialogDescription>
              Create a new device. Click submit when you are done.
            </DialogDescription>
          </VisuallyHidden>

          <Form {...form}>
            <form
              className="flex flex-col gap-4 my-6"
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
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {deviceTypeSchema.options.map((type) => (
                          <SelectItem key={type} value={type}>
                            {capitalize(type.toLowerCase())}
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

              <footer className="flex gap-4 justify-end">
                <Button variant="outline" type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button>Submit</Button>
              </footer>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
