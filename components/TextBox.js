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
            {label ? <label style={{color: "white", margin: "10px 0", width: "100%", fontSize: "small"}}>{label}</label> : ''}
            <input type="text" className={styles.textbox} {...props}>{props.children}</input>
        </>
    )
}
