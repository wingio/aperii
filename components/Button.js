import React from 'react'
import styles from '../styles/Button-Primary.module.css'

export default function Button({ label, click, style }) {
    return (
        <button onClick={click} className={styles.btnPrimary} className={styles[style] ? styles[style] : styles.primary}>
            {label}
        </button>
    )
}