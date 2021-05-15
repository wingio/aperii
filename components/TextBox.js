import React from 'react'
import styles from '../styles/TextBox.module.css'
export default function TextBox({ label }) {
    return (
        <>
            {label ? <label>{label}</label> : ''}
            <input type="text" className={styles.textbox}></input>
        </>
    )
}
