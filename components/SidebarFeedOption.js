import React from 'react'

export default function SidebarFeedOption( { name, current, icon } ) {
    return (
        <div className={`sidebar-option ${current ? 'current' : ''}`}>
            <img src={icon ? `/icons/${icon}.svg` : ''}></img>
            <p>{name}</p>
        </div>
    )
}
