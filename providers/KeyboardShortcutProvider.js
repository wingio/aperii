import React, {useState} from 'react'
import Changelog from '../components/Changelog'
import * as info from '../info.json'

export default function KeyboardShortcutProvider(props) {
    const [showChangelog, setShowChangelog] = useState(false)
    const [vanished, setVanished] = useState(false)
    
    var close = () => {
        localStorage.setItem('currentVersion', info.version)
        setVanished(true)
        setTimeout(() => {
            setShowChangelog(false)
        }, 25)
    }

    if(typeof window != "undefined"){
        document.addEventListener("keyup", (e) => {
            console.log(e.key)
            if(e.key == "/"){
                setShowChangelog(true)
            }
        })
    }

    return (
        <>
            {showChangelog ? <Changelog closeAction={close} vanished={vanished}></Changelog> : ''}
            {props.children}
        </>
    )
}
