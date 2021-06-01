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
            {label ? <label style={{color: "white"}}>{label}</label> : ''}
            <input type="text" className={styles.textbox} {...props}>{props.children}</input>
        </>
    )
}
