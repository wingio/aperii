import React, {useState} from 'react'
import Modal from './Modal'
import SectionTitle from './SectionTitle'
import * as info from '../info.json'
export default function Changelog() {
    const [opened, setOpen] = useState(true)

    var close = () => {
        setOpen(false)
    }
    return (
        opened ? <Modal title="See what's new!" subtitle={`Version: ${info.version}`} buttons={[{label: 'OK', btnstyle: 'primary', onClick: close}]}>
            {info.changelog.image && <img src={info.changelog.image}></img>}
            {info.changelog.sections.map(s => {
                <div>
                    <SectionTitle style={{color: "white"}}>{s.name}</SectionTitle>
                    <p style={{color: "white"}}>{s.value}</p>
                </div>
            })}
        </Modal> : <></>
    )
}
