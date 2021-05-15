import React from 'react'
import styles from '../styles/Modal.module.css'
import ButtonPrimary from './Button-Primary'

export default function Modal() {
    return (
        <div className={styles.background}>
            <div className={styles.popout}>
                <div className={styles.bottom}>
                    <ButtonPrimary label="Save"></ButtonPrimary>
                </div>
            </div>            
        </div>
    )
}
