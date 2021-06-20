import React, {useState} from 'react';
import Icon from '../icons/Icon';
import styles from '../styles/DropdownItem.module.css'
function DropdownItem(props) {
    const {label, icon, loc, action, click} = props
    function goToHref(){
        if(loc){
            if(typeof window != 'undefined'){
                window.location = loc
            }
        }
    }

    const [optionIcon, setIcon] = useState(icon)

    function doAction() {
        switch (action) {
            case "logout":
                if (typeof window != 'undefined') {
                    localStorage.removeItem('token')
                    window.location = '/'
                }
                break;
            case "toggletheme":
                var theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : "dark"
                var body = document.querySelector("body")
                if (theme == "dark") {
                    body.classList.remove('light')
                    body.classList.add('dark')
                    localStorage.setItem('theme', 'dark')
                    setIcon('sun')
                } else {
                    body.classList.remove('dark')
                    body.classList.add('light')
                    localStorage.setItem('theme', 'light')
                    setIcon('moon')
                }
                break;
        }

    }

    return (
        <div className={styles.dropdownitem} onClick={click ? click : loc ? goToHref : doAction}>
            <Icon name={optionIcon} width="15px" style={{margin: '10px'}}/>
            <p style={{margin:0}}>{label}</p>
        </div>
    );
}

export default DropdownItem;