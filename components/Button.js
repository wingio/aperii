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
    var disabled = (typeof props.loading != "undefined") ? props.disabled : !!loading
    return (
        <button className={styles[btnstyle] ? styles[btnstyle] : styles.primary} {...props} disabled={disabled}>
            {loading ? <Loading style={{color: "rgba(255, 255, 255, .7)"}} height="8px" /> : label}
        </button>
    )
}