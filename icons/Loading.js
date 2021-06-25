import * as React from "react";
/**
 * @param {React.SVGProps<SVGSVGElement>} props 
 */
function User(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 64" 
      {...props}
    >
      <circle fill="currentColor" cx="0" cy="0" r="11" transform="translate(16 16)">
        <animateTransform attributeName="transform" type="scale" additive="sum" values="1;1.42;1;1;1;1;1;1;1;1" dur="600ms" repeatCount="indefinite"></animateTransform>
      </circle>
      <circle fill="currentColor" cx="0" cy="0" r="11" transform="translate(64 16)">
        <animateTransform attributeName="transform" type="scale" additive="sum" values="1;1;1;1;1.42;1;1;1;1;1" dur="600ms" repeatCount="indefinite"></animateTransform>
      </circle>
      <circle fill="currentColor" cx="0" cy="0" r="11" transform="translate(112 16)">
        <animateTransform attributeName="transform" type="scale" additive="sum" values="1;1;1;1;1;1;1;1.42;1;1" dur="600ms" repeatCount="indefinite"></animateTransform>
      </circle>
    </svg>
  );
}

export default User;