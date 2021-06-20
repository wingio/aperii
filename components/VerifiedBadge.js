import React, {useState} from 'react'
import Icon from '../icons/Icon'
import VerifiedInfoModal from './VerifiedInfoModal'
export default function VerifiedBadge({className}) {
    const [opened, setOpened] = useState(false)
    return (
        <>
            {opened ? <VerifiedInfoModal close={() => {setOpened(false)}} vanished={!opened}></VerifiedInfoModal> : ''}
            <Icon name="badge" onClick={() => {setOpened(true)}} width="1.2rem" className={className} style={{color: "var(--badge-color)"}}></Icon>
        </>
    )
}
