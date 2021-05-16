import React from 'react'
import styles from '../styles/Button.module.css'
/**
 * 
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props
 * @returns 
 */
export default function Button(props) {
    const { label, btnstyle } = props
    return (
        <button className={styles[btnstyle] ? styles[btnstyle] : styles.primary} {...props}>
            {label}
        </button>
    )
}