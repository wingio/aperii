import postStyle from '../styles/Post.module.css'
import Tooltip from './Tooltip'
import {useState} from 'react'
import PostBody from './PostBody'
import Badge from '../icons/Badge'
const data = ({data, embed}) => {
    const [visible, setVisible] = useState(false)

    function showTooltip() {
        setVisible(true)
    }

    function hideTooltip() {
        setVisible(false)
    }

    var umentionRegex = /@[a-zA-Z0-9_]+/g

    return (<div className={postStyle.post + ` ${embed ? `embed` : ''}`}>
        <div className={postStyle.avcontainer}>
            <img className={postStyle.av} src={data.author.avatar ? data.author.avatar : '/av.png'}></img>
        </div>
        <div className={postStyle.bodycontainer}>
        <div className={postStyle.author}>
            <a href={`/p/${data.author.username}`}><span className={postStyle.displayName}>{data.author.displayName}</span></a>
            {data.author.verified ? <Badge className={postStyle.badge} width="15px"></Badge> : ''}
            <span className={postStyle.username}>@{data.author.username}</span>
        </div>
            <p className={postStyle.content}><PostBody text={data.body}></PostBody></p>
        </div>
    </div>)
}

export default data;