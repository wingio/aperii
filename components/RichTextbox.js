import React from 'react'
import styles from '../styles/RichTextbox.module.css'

export default function RichTextbox() {
    return (
        <div className={styles.cont}>
            <div className={styles.editable} contentEditable="true"></div>
        </div>
    )
}
