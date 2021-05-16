import React from 'react'
import styles from '../styles/Button.module.css'

export default function Button({ label, click, style }) {
    return (
        <button className={styles.btnPrimary} className={styles[style] ? styles[style] : styles.primary}>
            {label}
        </button>
    )
}