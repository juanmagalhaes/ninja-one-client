import * as React from "react";
import { SVGProps, Ref, forwardRef, memo } from "react";
const SvgComponent = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    ref={ref}
    {...props}
  >
    <path
      fill="currentColor"
      d="M13.5 0c-.281 0-.5.25-.5.5v4.063C12 2.124 9.625.5 7 .5A6.511 6.511 0 0 0 .562 5.938.498.498 0 0 0 1 6.5h.063c.25 0 .468-.156.5-.406A5.49 5.49 0 0 1 12.094 5H8.5c-.281 0-.5.25-.5.5 0 .281.219.5.5.5h5c.25 0 .5-.219.5-.5v-5c0-.25-.25-.5-.5-.5Zm-.531 7.531c-.281-.062-.531.125-.594.407-.406 2.656-2.688 4.562-5.406 4.562-2.282 0-4.313-1.375-5.125-3.5H5.5c.25 0 .5-.219.5-.5 0-.25-.25-.5-.5-.5h-5c-.281 0-.5.25-.5.5v5c0 .281.219.5.5.5.25 0 .5-.219.5-.5V9.469c.969 2.437 3.344 4.031 6 4.031a6.475 6.475 0 0 0 6.406-5.406.498.498 0 0 0-.437-.563Z"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
export { Memo as TurningArrows };
