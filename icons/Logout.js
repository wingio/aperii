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
      <path d=" M 57.114 512 C 57.114 260.942 260.942 57.114 512 57.114 C 763.058 57.114 966.886 260.942 966.886 512 C 966.886 763.058 763.058 966.886 512 966.886 C 260.942 966.886 57.114 763.058 57.114 512 Z  M 401.765 567.791 L 638.921 780.645 L 483.259 780.645 L 178.343 511.007 L 483.259 243.355 L 638.921 243.355 L 400.005 456.209 L 797.657 456.209 L 797.657 567.791 L 401.765 567.791 Z " fillRule="evenodd" fill="currentColor"/>
    </svg>
  );
}

export default User;