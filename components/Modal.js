import React from 'react'
import styles from '../styles/Modal.module.css'
import ButtonPrimary from './Button-Primary'

export default function Modal({ children }) {

    function testF(e) {

    }

    return (
        <div className={styles.background}>
            <div className={styles.popout}>
                <div className={styles.content}>
                    {children}
                </div>
                <div className={styles.bottom}>
                    <ButtonPrimary label="Save" click={testF}></ButtonPrimary>
                </div>
            </div>            
        </div>
    )
}
