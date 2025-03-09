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
      fill="#595766"
      d="M11.5 8A1.5 1.5 0 0 1 13 6.5c.813 0 1.5.688 1.5 1.5A1.5 1.5 0 0 1 13 9.5 1.48 1.48 0 0 1 11.5 8Zm-5 0A1.5 1.5 0 0 1 8 6.5c.813 0 1.5.688 1.5 1.5A1.5 1.5 0 0 1 8 9.5 1.48 1.48 0 0 1 6.5 8Zm-2 0A1.5 1.5 0 0 1 3 9.5 1.48 1.48 0 0 1 1.5 8 1.5 1.5 0 0 1 3 6.5c.813 0 1.5.688 1.5 1.5Z"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
export { Memo as Dots };
