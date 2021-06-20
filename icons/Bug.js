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
      <path d=" M 561.325 50.36 C 545.889 44.919 529.288 41.958 512 41.958 C 491.823 41.958 472.58 45.991 455.035 53.294 L 401.741 0 L 378.297 23.443 L 424.991 70.137 C 387.744 97.131 363.498 140.986 363.498 190.46 C 363.498 225.727 375.818 258.139 396.4 283.61 C 355.291 310.695 319.697 351.768 292.683 402.495 L 125.822 306.158 L 106.583 339.481 L 276.118 437.363 C 253.816 490.269 240.149 551.293 237.879 616.528 L 57.777 616.528 L 57.777 655.006 L 237.869 655.006 C 240.106 720.254 253.745 781.297 276.022 834.227 L 106.583 932.053 L 125.822 965.376 L 292.568 869.106 C 342.667 963.316 422.342 1024.284 512 1024.284 C 601.658 1024.284 681.333 963.316 731.432 869.106 L 898.178 965.376 L 917.417 932.053 L 747.978 834.227 C 770.255 781.297 783.894 720.254 786.131 655.006 L 966.223 655.006 L 966.223 616.528 L 786.121 616.528 C 783.851 551.293 770.184 490.269 747.882 437.363 L 917.417 339.481 L 898.178 306.158 L 731.317 402.495 C 704.303 351.768 668.709 310.695 627.6 283.61 C 648.182 258.139 660.502 225.727 660.502 190.46 C 660.502 138.262 633.512 92.317 592.739 65.833 L 635.128 23.443 L 611.685 0 L 561.325 50.36 Z " fill="currentColor"/>
    </svg>
  );
}

export default User;