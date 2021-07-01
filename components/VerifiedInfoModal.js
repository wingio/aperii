import React, { useState } from 'react'
import Modal from './Modal'
import Icon from '../icons/Icon'
import styles from '../styles/VerifiedInfoModal.module.css'
import useLang from '../providers/useLang'
export default function VerifiedInfoModal({close, vanished}) {
    const lang = useLang()
    const [text, setText] = useState(lang)
    return (
        <Modal buttons={[{label: text.buttons.ok, btnstyle: 'primary', onClick: close}]} showVanish={vanished}>
            <div className={styles.content}>
                <Icon name="badge" width="3rem" style={{marginBottom: "10px", color: "var(--badge-color)"}}></Icon>
                {text.verified.description}
            </div>
        </Modal>
    )
}

