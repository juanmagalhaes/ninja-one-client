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
      fill="#6E6D7A"
      d="m12.688 7.719-3.97 4A1.101 1.101 0 0 1 8 12a.99.99 0 0 1-.719-.281l-3.968-4a.968.968 0 0 1-.25-1.094C3.219 6.25 3.593 6 4 6h7.969c.406 0 .75.25.906.625.156.375.094.813-.188 1.094Z"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
export { Memo as ArrowDown };
