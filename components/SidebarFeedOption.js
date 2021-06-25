import React from 'react'
import Icon from '../icons/Icon'
import { useRouter } from 'next/router'

export default function SidebarFeedOption( { name, current, icon, goto } ) {
    const router = useRouter()
    function route(url){
        router.push(url)
    }
    return (
        <div className={`sidebar-option ${current ? 'current' : ''}`} onClick={() => {if(goto) route(goto)}}>
            <Icon name={icon} width="20px" style={{color: current ? "white" : "var(--icon-color)"}} />
            <p>{name}</p>
        </div>
    )
}
