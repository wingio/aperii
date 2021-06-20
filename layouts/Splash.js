import React, {useState, useEffect} from 'react';
import Search from '../components/Search'
import MobilePostBtn from '../components/MobilePostBtn'
import ProfileDropdown from'../components/ProfileDropdown'
function Splash(props) {

  return (
    <div className="container" style={{width: "100vw", height: "100vh", position: 'fixed', top: 0, left: 0, background: "var(--primary-bg)", display: 'flex', alignItems: "center", justifyContent: "center"}}>
      <img src="/logo_circle.png" style={{width: "30vw", height: "30vw"}}></img>
    </div>
  );

}

export default Splash;