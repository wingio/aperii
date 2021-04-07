import postStyle from '../styles/Post.module.css'
import * as PostEx from '../Post'

const Post = () => {
    return (<div className={postStyle.post}>
        <div className={postStyle.avcontainer}>
            <img className={postStyle.av} src={PostEx.author.avatar}></img>
        </div>
        <div className={postStyle.bodycontainer}>
        <div className={postStyle.author}>
            <span className={postStyle.displayName}>{PostEx.author.displayName}</span>
            {PostEx.author.verified ? <span className={postStyle.badge}></span> : ''}
            <span className={postStyle.username}>@{PostEx.author.username}</span>
        </div>
            <span className={postStyle.content}>{PostEx.content}</span>
        </div>
    </div>)
}

export default Post;