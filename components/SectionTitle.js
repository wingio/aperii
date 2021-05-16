import React from 'react'

export default function SectionTitle(props) {
    return (
        <h4 {...props}>
            {props.children}
        </h4>
    )
}
