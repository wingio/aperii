import React from 'react'
import Icon from '../icons/Icon'

export default function SidebarFeedOption( { name, current, icon } ) {
    return (
        <div className={`sidebar-option ${current ? 'current' : ''}`}>
            <Icon name={icon} width="20px" style={{color: current ? "white" : "var(--icon-color)"}} />
            <p>{name}</p>
        </div>
    )
}
