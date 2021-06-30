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
      <path d=" M 60.14 459.303 C 86.291 233.03 278.764 57.114 512 57.114 C 763.058 57.114 966.886 260.942 966.886 512 C 966.886 763.058 763.058 966.886 512 966.886 C 278.063 966.886 85.134 789.911 59.908 562.654 L 342.383 812.448 L 516.472 812.448 L 251.242 574.395 L 694 574.395 L 694 449.605 L 249.274 449.605 L 516.472 211.552 L 342.383 211.552 L 60.14 459.303 Z " fill="currentColor"/>
    </svg>
  );
}

export default User;