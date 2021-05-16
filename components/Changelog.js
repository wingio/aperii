import React, {useState} from 'react'
import Modal from './Modal'
import SectionTitle from './SectionTitle'
import * as info from '../info.json'
import styles from '../styles/Changelog.module.css'
export default function Changelog() {
    const [opened, setOpen] = useState(true)

    var close = () => {
        localStorage.setItem('currentVersion', info.version)
        setOpen(false)
    }
    
    return (
        opened ? <Modal title="See what's new!" subtitle={`Version: ${info.version}`} buttons={[{label: 'OK', btnstyle: 'primary', onClick: close}]}>
            {info.changelog.image && <img src={info.changelog.image} style={{width: "100%", borderRadius: "0.5rem"}}></img>}
            {info.changelog.sections.map(s => 
                <div key={s.name}><h4 style={{color: "white", display:"flex", textTransform: "uppercase", fontSize: "0.9em"}} className={styles.section}>{s.name}</h4><p style={{color: "white"}}>{s.value}</p></div>
            )}
        </Modal> : <></>
    )
}