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
      <path d=" M 266.25 98.31 L 647 501.69 L 266.25 901.69 L 325.19 957.25 L 757.75 501.69 L 325.19 42.75 L 266.25 98.31 Z " fill="currentColor"/>
    </svg>
  );
}

export default User;