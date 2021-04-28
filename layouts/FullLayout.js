import React, { Component, useState } from 'react';
import Search from '../components/Search'
import ProfileDropdown from '../components/ProfileDropdown'
import SidebarFeedOption from '../components/SidebarFeedOption'
function FullLayout(props) {
  const [open, setOpen] = useState(false)

  function toggleDropdown(e) {
    setOpen(!open)
    e.target.className = `av ${open ? '' : 'clicked'}`
  }
  return (
    <div className="container">            
    <div className={`ui full`}>
  <div className={`sticky left`}>
    <span className={`logo`}></span>
    <SidebarFeedOption name="Home" current={true} icon="home"></SidebarFeedOption>
    <SidebarFeedOption name="Discover" icon="compass"></SidebarFeedOption>
  </div>
  <div className={`feed`}>
    <Search></Search>
    <div className="content">
      {props.children}
    </div>
  </div>
  <div className={`sticky right`}>
    <div className="av-container">
      
      <img className={`av`} src={'https://avatars.githubusercontent.com/u/44992537?v=1'} onClick={toggleDropdown}></img>
      {open ? <ProfileDropdown /> : ''}
    </div>
  </div>
</div>
</div>

);
}

export default FullLayout;