import React, {useState, useRef} from 'react'
import PostIcon from '../icons/CreatePost'
import Icon from '../icons/Icon'
import MakePostModal from './MakePostModal'
export default function MobilePostBtn({user, hasTabBar, post}) {
    const [modalOpened, setOpened] = useState(false)
    const [vanish, setVanished] = useState(false)
    var close = () => {
        setVanished(true)
        setTimeout(() => {
            setOpened(false)
        }, 25)
    }
    return (
        <>
        {modalOpened ? <MakePostModal user={user} closeAction={close} showVanish={vanish} post={post}></MakePostModal> : ''}
        <button onClick={() => {setOpened(true); setVanished(false)}} style={{border: "none", padding: "0", position: "fixed", bottom: "calc(60px + 0.5em)", right: "0.5em", borderRadius: "50%", background: "var(--primary)", width:"4rem", height:"4rem", fontSize: "3rem", fontWeight: "bolder", color: "white", display:"flex"}}>
            {post ? <Icon name="reply" width="1.5rem" style={{margin: "auto"}}/> : <PostIcon width="1.5rem" style={{margin: "auto"}}/>}
        </button>
        </>
    )
}
