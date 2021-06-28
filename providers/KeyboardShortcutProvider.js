import React, {useState} from 'react'
import Changelog from '../components/Changelog'
import ExperimentsModal from '../components/ExperimentsModal'
import * as info from '../info.json'

export default function KeyboardShortcutProvider(props) {
    const [showChangelog, setShowChangelog] = useState(false)
    const [showExp, setShowExp] = useState(false)
    const [clvanished, setClVanished] = useState(false)
    const [expvanished, setExpVanished] = useState(false)
    
    var clClose = () => {
        localStorage.setItem('currentVersion', info.version)
        setClVanished(true)
        setTimeout(() => {
            setShowChangelog(false)
        }, 25)
    }

    var expClose = () => {
        setClVanished(true)
        setTimeout(() => {
            setShowExp(false)
        }, 25)
    }

    if(typeof window != "undefined"){
        document.addEventListener("keyup", (e) => {
            if(e.ctrlKey){
                if(e.key == "F1"){
                    setShowChangelog(true)
                }

                if(e.key == "F2"){
                    setShowExp(true)
                }
            }
        })
    }

    return (
        <>
            {showChangelog ? <Changelog closeAction={clClose} vanished={clvanished} /> : ''}
            {showExp ? <ExperimentsModal vanished={expvanished} closeAction={expClose} exp={props.exp}/>: ''}
            {props.children}
        </>
    )
}
