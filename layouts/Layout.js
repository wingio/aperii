import React, {useState, useEffect} from 'react';
import FullLayout from './FullLayout'
import NoLeftLayout from './NoLeftLayout'
import MobileLayout from './MobileLayout'
import Splash from './Splash'
import KeyboardShortcutProvider from '../providers/KeyboardShortcutProvider';
function Layout(props) {
    const {width, height} = useWindowSize()
    if(typeof width == 'undefined'){
      return(
        <Splash />
      )
    } else if(width < 750){
        return (
        <KeyboardShortcutProvider exp={props.misc}>
          <MobileLayout {...props}>
            {props.children}
          </MobileLayout>
        </KeyboardShortcutProvider>
        )
    } else if( width < 965){
        return (
        <KeyboardShortcutProvider exp={props.misc}>
          <NoLeftLayout {...props}>
            {props.children}
          </NoLeftLayout>
        </KeyboardShortcutProvider>
        )
    } else if(width > 1320){
        return (
        <KeyboardShortcutProvider exp={props.misc}>
          <FullLayout {...props}>
            {props.children}
          </FullLayout>
        </KeyboardShortcutProvider>
        )
    } else {
        return (
        <KeyboardShortcutProvider exp={props.misc}>
          <NoLeftLayout {...props}>
            {props.children}
          </NoLeftLayout>
        </KeyboardShortcutProvider>
        )
    }

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

export default Layout;