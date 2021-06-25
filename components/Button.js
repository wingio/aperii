import React from 'react'
import styles from '../styles/Button.module.css'
import Loading from '../icons/Loading'
/**
 * 
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props
 * @returns 
 */
export default function Button(props) {
    const { label, btnstyle, loading } = props
    return (
        <button className={styles[btnstyle] ? styles[btnstyle] : styles.primary} {...props} disabled={!!loading}>
            {loading ? <Loading style={{color: "white"}} height="15px" /> : label}
        </button>
    )
}