import * as React from "react";
/**
 * @param {React.SVGProps<SVGSVGElement>} props 
 */
function Reply(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 1024 1024" 
      {...props}
    >
      <path d=" M 470.661 326.873 L 470.661 206.28 C 470.661 188.464 458.256 181.438 442.976 190.599 L 246.331 308.5 L 49.685 426.401 C 34.405 435.562 34.405 450.438 49.685 459.599 L 246.331 577.5 L 442.976 695.401 C 458.256 704.562 470.661 697.536 470.661 679.72 L 470.661 548.289 C 738.556 548.289 912.124 718.857 912.124 829.892 C 912.124 835.963 917.053 840.892 923.124 840.892 C 981.551 840.892 1148.61 326.873 470.661 326.873 Z " fill="currentColor"/>
    </svg>
  );
}

export default Reply;