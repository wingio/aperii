import React, {InputHTMLAttributes} from 'react'
import styles from '../styles/TextBox.module.css'
/**
 * 
 * @param {InputHTMLAttributes<HTMLInputElement>} props 
 * @returns 
 */
export default function TextBox(props) {
    const { label } = props
    return (
        <>
            {label ? <label>{label}</label> : ''}
            <input type="text" className={styles.textbox} {...props}></input>
        </>
    )
}
