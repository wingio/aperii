import React, {useState, useRef} from 'react'
import PostIcon from '../icons/CreatePost'
import MakePostModal from './MakePostModal'
export default function MobilePostBtn({user, hasTabBar}) {
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
        {modalOpened ? <MakePostModal user={user} closeAction={close} showVanish={vanish}></MakePostModal> : ''}
        <button className="desktop-newpost" onClick={() => {setOpened(true); setVanished(false)}} style={{border: "none", padding: "10px", borderRadius: "10px", background: "var(--primary)", width:"100%", color: "white"}}>
            <PostIcon width="1.5rem" style={{margin: "auto"}}/>
        </button>
        </>
    )
}
