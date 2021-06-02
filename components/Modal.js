import React, {useState} from 'react'
import styles from '../styles/Modal.module.css'
import Button from './Button'


export default function Modal({ children, title, subtitle, buttons, showVanish }) {

    const [isOpened, setOpened] = useState(true)

    function closeModal(e) {
        setOpened(false)
    }

    return (
        isOpened ? 
        <div className={styles.background}>
        <div className={`${styles.popout} ${showVanish ? styles.vanish : ''}`}>
            <div className={styles.content}>
                {title ? <h3 style={{marginTop: 0, color: "white", marginBottom: subtitle ? 0 : 'revert'}}>{title}</h3> : ''}
                {subtitle ? <p style={{marginTop: ".2em", color: "white", fontSize: ".7em"}}>{subtitle}</p> : ''}
                {children}
            </div>
            <div className={styles.bottom}>
                {buttons ? buttons.map(b => <Button {...b}></Button>) : ''}
            </div>
        </div>            
    </div> : <></>
    )
}
