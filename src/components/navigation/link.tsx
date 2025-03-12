"use client";
import { useSearchParams } from "next/navigation";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { UrlObject } from "url";

export type LinkProps = Omit<NextLinkProps, "href"> & {
  href: string | UrlObject;
  forwardSearch?: boolean;
  className?: string;
};

export function Link({ forwardSearch = false, href, ...props }: LinkProps) {
  const searchParams = useSearchParams();

  let finalHref: string | UrlObject = href;
  if (forwardSearch) {
    const currentParams = searchParams.toString();
    if (currentParams) {
      if (typeof href === "string") {
        finalHref += (href.includes("?") ? "&" : "?") + currentParams;
      } else {
        finalHref = {
          ...href,
          search: href.search
            ? `${href.search}&${currentParams}`
            : currentParams,
        };
      }
    }
  }

  return <NextLink href={finalHref} {...props} />;
}
