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
      <path d=" M 552.032 270.984 C 552.032 171.648 632.68 91 732.016 91 C 831.352 91 912 171.648 912 270.984 C 912 370.32 831.352 450.968 732.016 450.968 C 632.68 450.968 552.032 370.32 552.032 270.984 Z  M 415.171 519.964 L 589.358 418.166 L 900.293 511.899 L 766.754 956 L 322.652 822.46 L 415.171 519.964 Z  M 611.473 405.246 L 384.632 536.213 L 157.791 667.179 L 157.791 405.246 L 157.791 143.313 L 384.632 274.279 L 611.473 405.246 Z " fillRule="evenodd" fill="currentColor"/>
    </svg>
  );
}

export default User;