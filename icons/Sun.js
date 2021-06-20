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
      <path d=" M 661.961 149.961 L 512 0 L 362.039 149.961 L 149.961 149.961 L 149.961 362.039 L 0 512 L 149.961 661.961 L 149.961 874.039 L 362.039 874.039 L 512 1024 L 661.961 874.039 L 874.039 874.039 L 874.039 661.961 L 1024 512 L 874.039 362.039 L 874.039 149.961 L 661.961 149.961 Z  M 214.981 512 C 214.981 348.071 348.071 214.981 512 214.981 C 675.929 214.981 809.019 348.071 809.019 512 C 809.019 675.929 675.929 809.019 512 809.019 C 348.071 809.019 214.981 675.929 214.981 512 Z " fillRule="evenodd" fill="currentColor"/>
    </svg>
  );
}

export default User;