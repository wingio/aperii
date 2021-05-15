import React from 'react'

export default function ButtonPrimary({ label, click }) {
    return (
        <button onClick={click}>
            {label}
        </button>
    )
}