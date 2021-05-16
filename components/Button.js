import React from 'react'
import styles from '../styles/Button.module.css'
/**
 * 
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props
 * @returns 
 */
export default function Button(props) {
    const { label, click, style } = props
    return (
        <button className={styles.btnPrimary} className={styles[style] ? styles[style] : styles.primary} {...props}>
            {label}
        </button>
    )
}