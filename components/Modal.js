import React from 'react'
import styles from '../styles/Modal.module.css'
import Button from './Button'


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
                    <Button label="Dismiss" click={testF} style="secondary"></Button>
                    <Button label="Save" click={testF} style="primary"></Button>
                </div>
            </div>            
        </div>
    )
}
