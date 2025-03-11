import * as React from "react";
import { SVGProps, Ref, forwardRef, memo } from "react";
const SvgComponent = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={16}
    fill="none"
    ref={ref}
    {...props}
  >
    <path
      fill="#6E6D7A"
      d="m15.75 14.719-4.188-4.188c.907-1.094 1.407-2.5 1.407-4.031 0-3.563-2.938-6.5-6.5-6.5C2.875 0 0 2.938 0 6.5 0 10.094 2.906 13 6.469 13c1.5 0 2.906-.5 4.031-1.406l4.188 4.187a.753.753 0 0 0 .562.219.622.622 0 0 0 .5-.219c.313-.281.313-.75 0-1.062ZM1.5 6.5c0-2.75 2.219-5 5-5 2.75 0 5 2.25 5 5 0 2.781-2.25 5-5 5-2.781 0-5-2.219-5-5Z"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
export { Memo as Search };
