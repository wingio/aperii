import React from 'react'
/**
 * 
 * @param {React.FormHTMLAttributes<HTMLFormElement>} props 
 * @returns 
 */
export default function ModalForm(props) {
    return (
        <form {...props}>{props.children}</form>
    )
}
