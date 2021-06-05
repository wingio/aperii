import * as React from "react";
/**
 * @param {React.SVGProps<SVGSVGElement>} props 
 */
function Logo(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 1024 1024" 
      {...props}
    >
      <path d=" M 293.924 261.346 C 343.888 130.828 470.51 38.619 618.492 38.619 C 811.255 38.619 967.767 195.094 967.767 387.894 C 967.767 511.795 903.096 620.732 805.152 681.947 C 806.439 670.439 806.954 658.674 806.954 646.799 C 806.954 597.423 798.02 550.105 781.696 506.354 C 806.365 473.301 820.704 432.234 820.704 387.894 C 820.704 276.273 730.076 185.682 618.492 185.682 C 559.998 185.682 507.276 210.536 470.657 250.648 C 449.48 247.155 427.678 245.353 405.508 245.353 C 366.757 245.353 329.292 250.868 293.924 261.346 Z " fill-rule="evenodd" fill="currentColor"/>
      <path d=" M 56.233 646.799 C 56.233 454.036 212.745 297.524 405.508 297.524 C 598.271 297.524 754.783 454.036 754.783 646.799 C 754.783 839.599 598.271 996.074 405.508 996.074 C 212.745 996.074 56.233 839.599 56.233 646.799 Z  M 203.296 646.799 C 203.296 535.215 293.887 444.587 405.508 444.587 C 517.092 444.587 607.72 535.215 607.72 646.799 C 607.72 758.42 517.092 849.011 405.508 849.011 C 293.887 849.011 203.296 758.42 203.296 646.799 Z " fill-rule="evenodd" fill="currentColor"/>
    </svg>
  );
}

export default Logo;