import React, {useState} from 'react'
import Changelog from '../components/Changelog'
import * as info from '../info.json'

export default function KeyboardShortcutProvider(props) {
    const [showChangelog, setShowChangelog] = useState(false)
    const [vanished, setVanished] = useState(false)
    /**
     * @type {React.KeyboardEventHandler<HTMLDivElement}
     */
    var handleKeypress = (e) => {
        if(e.key == "F1"){
            setShowChangelog(true)
        }
    }
    var close = () => {
        localStorage.setItem('currentVersion', info.version)
        setVanished(true)
        setTimeout(() => {
            setShowChangelog(false)
        }, 25)
    }

    return (
        <div onKeyDown={handleKeypress}>
            {showChangelog ? <Changelog closeAction={close} vanished={vanished}></Changelog> : ''}
            {props.children}
        </div>
    )
}
