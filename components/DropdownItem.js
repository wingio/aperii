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
                    var cookies = document.cookie.split(";");
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = cookies[i];
                        var eqPos = cookie.indexOf("=");
                        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                    }

                    localStorage.removeItem('token')
                    window.location = '/'
                }
                break;
            case "toggletheme":
                var theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : "dark"
                var body = document.querySelector("body")
                if (theme == "light") {
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