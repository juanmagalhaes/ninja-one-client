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
      d="M11.938 8.406c0-1.156.53-2 1.562-2.656-.594-.844-1.469-1.281-2.625-1.375C9.75 4.281 8.531 5 8.094 5c-.469 0-1.531-.594-2.375-.594-1.75.032-3.594 1.375-3.594 4.157 0 .812.125 1.656.438 2.53.406 1.157 1.843 3.97 3.343 3.907.782 0 1.344-.563 2.375-.563 1 0 1.5.563 2.375.563 1.531 0 2.844-2.563 3.219-3.719-2.031-.969-1.938-2.812-1.938-2.875Zm-1.75-5.125c.843-1 .75-1.937.75-2.281-.75.063-1.626.531-2.126 1.094C8.25 2.719 7.939 3.5 8 4.344c.813.062 1.563-.344 2.188-1.063Z"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
export { Memo as MacLogo };
