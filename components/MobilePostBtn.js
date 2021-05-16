import React from 'react'
import PostIcon from '../icons/CreatePost'
export default function MobilePostBtn({user}) {
    return (
        <button style={{border: "none", padding: "0", position: "fixed", bottom: "0.5em", right: "0.5em", borderRadius: "50%", background: "var(--rust-blood)", width:"4rem", height:"4rem", fontSize: "3rem", fontWeight: "bolder", color: "white", display:"flex"}}>
            <PostIcon width="1.5rem" style={{margin: "auto"}}/>
        </button>
    )
}
