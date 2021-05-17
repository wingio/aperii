import { faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'

function ProfileDropdown(props) {
  var expiramentsEnabled = faCloudShowersHeavy
  if (typeof window !== "undefined") {
    var exp = localStorage.getItem('enableExperiments')
    if (exp) {
      exp == true || exp == "true" ? expiramentsEnabled = true : expiramentsEnabled = false
    }
  }

  return (
      <Dropdown>
        <DropdownItem loc={`/p/${props.user.username}`} label="Profile" icon='user'></DropdownItem>
        <DropdownItem label="Report a bug" icon='bug' loc="https://github.com/wingio/aperii/issues/new/choose"></DropdownItem>
        <DropdownItem label="Language" icon='globe' loc="/"></DropdownItem>
        <DropdownItem label="Discord" icon='discord' loc="https://discord.gg/Mryxr7zVtc"></DropdownItem>
        <DropdownItem label="Settings" icon='gear' loc="/"></DropdownItem>
        {expiramentsEnabled ? <DropdownItem label="Experiments" icon='gear' loc="/"></DropdownItem> : ''}
        <DropdownItem label="Log Out" icon='gear' action="logout"></DropdownItem>
      </Dropdown>
  );
}

export default ProfileDropdown;