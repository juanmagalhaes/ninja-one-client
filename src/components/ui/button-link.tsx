import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";
import { Link, LinkProps } from "../navigation/link";

export type ButtonLinkProps = PropsWithChildren<
  LinkProps &
    VariantProps<typeof buttonVariants> & {
      className?: string;
    }
>;

function ButtonLink({ className, variant, size, ...props }: ButtonLinkProps) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { ButtonLink };
