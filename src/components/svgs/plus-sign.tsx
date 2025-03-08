import * as React from "react";
import { SVGProps, Ref, forwardRef, memo } from "react";
const SvgComponent = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    ref={ref}
    {...props}
  >
    <path
      fill="currentColor"
      d="M14.5 8a.74.74 0 0 1-.75.75h-5v5c0 .438-.344.781-.75.781-.438 0-.75-.344-.75-.781v-5h-5c-.438 0-.75-.313-.75-.719 0-.437.313-.781.75-.781h5v-5c0-.406.313-.719.75-.719.406 0 .75.313.75.719v5h5a.76.76 0 0 1 .75.75Z"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
export { Memo as PlusSign };
