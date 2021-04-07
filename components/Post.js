import postStyle from '../styles/Post.module.css'
import * as Posts from '../Post'
import Tooltip from './Tooltip'



const Post = ({id}) => {
    function show(e){
        if(e.target.children[0]) {
            e.target.children[0].style.display = 'block'
        }
    }
    function hide(e){
        if(e.target.children[0]) {
            e.target.children[0].style.display = 'none'
        }
    }
    const Post = Posts.filter(p => p.id == id)[0]
    return (<div className={postStyle.post}>
        <div className={postStyle.avcontainer}>
            <img className={postStyle.av} src={Post.author.avatar}></img>
        </div>
        <div className={postStyle.bodycontainer}>
        <div className={postStyle.author}>
            <span className={postStyle.displayName}>{Post.author.displayName}</span>
            {Post.author.verified ? <span onMouseOver={show} onMouseLeave={hide} className={postStyle.badge}><Tooltip text="Verified"></Tooltip></span>: ''}
            <span className={postStyle.username}>@{Post.author.username}</span>
        </div>
            <span className={postStyle.content}>{Post.content}</span>
        </div>
    </div>)
}

export default Post;