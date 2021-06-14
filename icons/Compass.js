import * as React from "react";
/**
 * @param {React.SVGProps<SVGSVGElement>} props 
 */
function User(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 1024 1024" 
      {...props}
    >
      <path d=" M 406.99 652.48 L 337.38 686.62 L 371.52 617.01 L 433.22 491.21 L 483.01 540.99 L 532.79 590.78 L 406.99 652.48 L 406.99 652.48 L 406.99 652.48 Z  M 425.047 689.287 L 247.759 776.241 L 334.713 598.953 L 421.666 421.666 L 512 512 L 602.334 602.334 L 425.047 689.287 L 425.047 689.287 L 425.047 689.287 Z  M 0 512 C 0 229.42 229.42 0 512 0 C 794.581 0 1024 229.42 1024 512 C 1024 794.581 794.581 1024 512 1024 C 229.42 1024 0 794.581 0 512 L 0 512 Z  M 602.334 602.334 L 512 512 L 421.666 421.666 L 598.953 334.713 L 776.241 247.759 L 689.287 425.047 L 602.334 602.334 Z " fill-rule="evenodd" fill="currentColor"/>
    </svg>
  );
}

export default User;