import React from 'react'
import styles from '../styles/Modal.module.css'

export default function ButtonPrimary({ label, click }) {
    return (
        <button onClick={click} className={styles.btnPrimary}>
            {label}
        </button>
    )
}