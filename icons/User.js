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
      <path d=" M 1024 977.222 C 1024 789.685 794.58 637.429 512 637.429 C 229.42 637.429 0 789.685 0 977.222 L 0 977.222 L 0 977.222 L 0 1597.423 L 1024 1597.423 L 1024 977.222 Z  M 216.5 295.5 C 216.5 132.409 348.909 0 512 0 C 675.091 0 807.5 132.409 807.5 295.5 C 807.5 458.591 675.091 591 512 591 C 348.909 591 216.5 458.591 216.5 295.5 Z " fill-rule="evenodd" fill="currentColor"/>
    </svg>
  );
}

export default User;