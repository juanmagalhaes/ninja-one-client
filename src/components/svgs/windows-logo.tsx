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
      d="m1 2.938 5.719-.782v5.531H1v-4.75Zm0 10.156 5.719.781V8.406H1v4.688Zm6.344.875L15 15V8.406H7.344v5.563Zm0-11.906v5.624H15V1L7.344 2.063Z"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
export { Memo as WindowsLogo };
