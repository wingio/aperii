import React from 'react'

export default function ContextMenu({ x, y }) {
    return (
        <div style={{color: "white", position: 'fixed', top: y, left: x, padding: '5px', border: '1px solid var(--border-grey)'}}>
            <ul>
                <li>Like post</li>
                <li>Share post</li>
            </ul>
        </div>
    )
}
