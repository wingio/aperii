import React from 'react'
import styles from '../styles/Button-Primary.module.css'

export default function ButtonPrimary({ label, click }) {
    return (
        <button onClick={click} className={styles.btnPrimary}>
            {label}
        </button>
    )
}