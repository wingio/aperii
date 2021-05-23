import React, {useState, useRef} from 'react'
import PostIcon from '../icons/CreatePost'
import MakePostModal from './MakePostModal'
export default function MobilePostBtn({user, hasTabBar}) {
    const [modalOpened, setOpened] = useState(false)
    var close = () => {
        setOpened(false)
    }
    return (
        <>
        {modalOpened ? <MakePostModal user={user} closeAction={close}></MakePostModal> : ''}
        <button onClick={() => {setOpened(true)}} style={{border: "none", padding: "0", position: "fixed", bottom: "calc(60px + 0.5em)", right: "0.5em", borderRadius: "50%", background: "var(--rust-blood)", width:"4rem", height:"4rem", fontSize: "3rem", fontWeight: "bolder", color: "white", display:"flex"}}>
            <PostIcon width="1.5rem" style={{margin: "auto"}}/>
        </button>
        </>
    )
}
