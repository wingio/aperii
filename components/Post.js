import postStyle from '../styles/Post.module.css'
import * as Posts from '../Post'
import Tooltip from './Tooltip'
import {useState} from 'react'


const Post = ({id}) => {
    const [visible, setVisible] = useState(false)
    const Post = Posts.filter(p => p.id == id)[0]

    function showTooltip() {
        setVisible(true)
    }

    function hideTooltip() {
        setVisible(false)
    }

    return (<div className={postStyle.post}>
        <div className={postStyle.avcontainer}>
            <img className={postStyle.av} src={Post.author.avatar}></img>
        </div>
        <div className={postStyle.bodycontainer}>
        <div className={postStyle.author}>
            <span className={postStyle.displayName}>{Post.author.displayName}</span>
            {Post.author.verified ? <span onMouseOver={showTooltip} onMouseLeave={hideTooltip} className={postStyle.badge}>{visible ? <Tooltip text="Verified"></Tooltip> : ''}</span>: ''}
            <span className={postStyle.username}>@{Post.author.username}</span>
        </div>
            <span className={postStyle.content}>{Post.content}</span>
        </div>
    </div>)
}

export default Post;