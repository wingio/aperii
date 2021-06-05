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
      <path d=" M 512 1024 C 569.764 1024 617.026 976.738 617.026 918.974 L 406.974 918.974 C 406.974 976.978 453.996 1024 512 1024 Z  M 827.077 708.923 L 827.077 446.359 C 827.077 285.145 740.956 150.187 590.769 114.478 L 590.769 78.769 C 590.769 35.184 555.586 0 512 0 C 468.414 0 433.231 35.184 433.231 78.769 L 433.231 114.478 C 282.519 150.187 196.923 284.619 196.923 446.359 L 196.923 708.923 L 91.897 813.949 L 91.897 866.462 L 932.103 866.462 L 932.103 813.949 L 827.077 708.923 Z " fill="currentColor"/>
    </svg>
  );
}

export default User;