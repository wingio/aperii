import React from 'react';
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

    function doAction() {
        switch (action) {
            case "logout":
                if (typeof window != 'undefined') {
                    localStorage.removeItem('token')
                    window.location = '/'
                }
                break;
        }

    }

    return (
        <div className={styles.dropdownitem} onClick={click ? click : loc ? goToHref : doAction}>
            <Icon name={icon} width="15px" style={{margin: '10px'}}/>
            <p style={{margin:0}}>{label}</p>
        </div>
    );
}

export default DropdownItem;