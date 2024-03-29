import React, {useState, useEffect} from 'react';
import Search from '../components/Search'
import ProfileDropdown from '../components/ProfileDropdown'
import MobilePostBtn from '../components/MobilePostBtn'
import BottomTabBar from '../components/MobileTabBar'
import styles from '../styles/NoLeftLayout.module.css'
import { API_BASE_URL, CDN_BASE_URL } from '../constants';

function NoLeftLayout(props) {
  const {width, height} = useWindowSize()
  const [open, setOpen] = useState(false)
  const { user, misc, page, post } = props
  function toggleDropdown(e) {
    setOpen(!open)
    e.target.className = `av ${open ? '' : 'clicked'}`
  }
  return (
    <div className="container">
      <div className={`ui`} style={{gridTemplateColumns: width > 965 + 60 ? '640px 325px' : '640px 50px'}}>

        <div className={`feed`} style={{height: "100%!important"}}>
          <Search mobile={false}  title={props.title} showBadge={props.showBadge} showPosts={props.showCount} postCount={props.postCount} lang={props.lang}></Search>
          {props.children}
          <MobilePostBtn user={user} lang={props.lang} post={post}/>
          <BottomTabBar currentPage={page} username={user.username} misc={misc} lang={props.lang}/>
        </div>

        <div className={`sticky right`}>
          <div className="av-container">
            <img className={`av`} src={user ? user.avatar ? `${CDN_BASE_URL}/avatars/${user.avatar}` : '/av.png' : '/av.png' }
              onClick={toggleDropdown}></img>
            {open ?
            <ProfileDropdown user={user} exp={misc} lang={props.lang}/> : ''}
          </div>
        </div>
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

export default NoLeftLayout;