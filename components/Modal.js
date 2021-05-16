import React from 'react'
import styles from '../styles/Modal.module.css'
import Button from './Button'


export default function Modal({ children, title, subtitle }) {

    function testF(e) {

    }

    return (
        <div className={styles.background}>
            <div className={styles.popout}>
                <div className={styles.content}>
                    <h3 style={{marginTop: 0, color: "white", marginBottom: subtitle ? 0 : 'revert'}}>{title ? title : 'Hello 👋'}</h3>
                    {subtitle ? <p style={{marginTop: ".2em"}}>{subtitle}</p> : ''}
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
