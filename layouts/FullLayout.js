import React, { Component, useState } from 'react';
import Search from '../components/Search'
import Dropdown from '../components/Dropdown'
import DropdownItem from '../components/DropdownItem'

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
  </div>
  <div className={`feed`}>
    <Search></Search>
    {props.children}
  </div>
  <div className={`sticky right`}>
    <div className="av-container">
      <img className={`av`} src={'https://avatars.githubusercontent.com/u/44992537?v=1'} onClick={toggleDropdown}></img>
      {open ? <Dropdown><DropdownItem  loc="/" label="Profile" icon='user'></DropdownItem><DropdownItem label="Report a bug" icon='bug' loc="https://github.com/wingio/aperii/issues/new/choose"></DropdownItem></Dropdown> : ''}
    </div>
  </div>
</div>
</div>

);
}

export default FullLayout;