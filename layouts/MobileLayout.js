import React, {useState, useEffect} from 'react';
import Search from '../components/Search'
import MobilePostBtn from '../components/MobilePostBtn'
import ProfileDropdown from'../components/ProfileDropdown'
import BottomTabBar from '../components/MobileTabBar'
function MobileLayout(props) {
  const {width, height} = useWindowSize()
  const [open, setOpen] = useState(false)
  var expiramentsEnabled = false
  const expStore = props.misc
  const {user, page} = props
  if (typeof window !== "undefined") {
    var exp = localStorage.getItem('enableExperiments')
    if(exp){
      exp == true || exp == "true" ? expiramentsEnabled = true : expiramentsEnabled = false
    }
  }

  return (
    <div className="container" style={{display:"revert"}}>
      <div className={`ui`} style={{gridTemplateColumns: width >= 640? '640px' : '100%'}}>
      <div className="header sticky">
            <Search mobile={true}></Search>
            <div className="av-container">
              <img className={`av mobile`} src={user ? user.avatar ? user.avatar
                : '/av.png' : '/av.png' } onClick={()=> {setOpen(!open)}}></img>
              {open ?
              <ProfileDropdown user={props.user} exp={expStore} /> : ''}
            </div>
          </div>
        <div className={`feed`} style={{height: "!important"}}>
          
          {props.children}
          
        </div>
        <MobilePostBtn user={props.user} hasTabBar={true}/>
        <BottomTabBar currentPage={page} username={user.username} misc={props.misc}></BottomTabBar>
      </div>
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

export default MobileLayout;