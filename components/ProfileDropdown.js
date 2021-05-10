import React from 'react';
import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'

function ProfileDropdown(props) {
    return (
        <Dropdown>
          <DropdownItem  loc={`/p/${props.user.username}`} label="Profile" icon='user'></DropdownItem>
          <DropdownItem label="Report a bug" icon='bug' loc="https://github.com/wingio/aperii/issues/new/choose"></DropdownItem>
          <DropdownItem label="Language" icon='globe' loc="/"></DropdownItem>
          <DropdownItem label="Discord" icon='discord' loc="https://discord.gg/Mryxr7zVtc"></DropdownItem>
          <DropdownItem label="Settings" icon='gear' loc="/"></DropdownItem>
          <DropdownItem label="Log Out" icon='gear' action="logout"></DropdownItem>
        </Dropdown>
    );
}

export default ProfileDropdown;