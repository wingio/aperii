import React, {useState} from 'react';
import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'
import ExperimentsModal from './ExperimentsModal'

function ProfileDropdown(props) {
  var expiramentsEnabled = false
  if (typeof window !== "undefined") {
    var exp = localStorage.getItem('enableExperiments')
    if (exp) {
      exp == true || exp == "true" ? expiramentsEnabled = true : expiramentsEnabled = false
    }
  }

  const [modalOpened, setOpened] = useState(false)
  var close = () => {
    setOpened(false)
  }

  const [themeIcon, setThemeIcon] = useState('sun')
  if (typeof window != "undefined") {
    var theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : "dark"
    if (theme == "light") {
      setThemeIcon('moon')
    } else {
      setThemeIcon('sun')
    }
  }

  return (
      <Dropdown>
        <DropdownItem label="Report a bug" icon='bug' loc="https://github.com/wingio/aperii/issues/new/choose"></DropdownItem>
        <DropdownItem label="Language" icon='globe' loc="/"></DropdownItem>
        <DropdownItem label="Discord" icon='discord' loc="https://discord.gg/Mryxr7zVtc"></DropdownItem>
        <DropdownItem label="Toggle theme" icon={themeIcon} action="toggletheme" />
        <DropdownItem label="Settings" icon='gear' loc="/settings"></DropdownItem>
        {expiramentsEnabled ? <DropdownItem label="Experiments" icon='gear' click={() => {setOpened(true)}}></DropdownItem> : ''}
        <DropdownItem label="Log Out" icon='gear' action="logout"></DropdownItem>
        {modalOpened ? <ExperimentsModal closeAction={close} exp={props.exp}></ExperimentsModal> : ''}
      </Dropdown>
  );
}

export default ProfileDropdown;