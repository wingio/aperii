import React, {useState, useEffect} from 'react';
import Search from './Search'


function NoLeftLayout(props) {
  const {width, height} = useWindowSize()
  return (
    <div className="container">
      <div className={`ui`} style={{gridTemplateColumns: width > 965 + 60 ? '640px 325px' : '640px 50px'}}>
        <div className={`feed`}>
          <Search></Search>
          {props.children}
        </div>
        <div className={`sticky right`}>
          <img className={`av`} src={'https://avatars.githubusercontent.com/u/44992537?v=1'}></img> </div> </div>
            </div>
  );


  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
  
    useEffect(() => {
      // only execute all the code below in client side
      if (typeof window !== 'undefined') {
        // Handler to call on window resize
        function handleResize() {
          // Set window width/height to state
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }
      
        // Add event listener
        window.addEventListener("resize", handleResize);
       
        // Call handler right away so state gets updated with initial window size
        handleResize();
      
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
      }
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }
}

export default NoLeftLayout;