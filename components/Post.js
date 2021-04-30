import postStyle from '../styles/Post.module.css'
import Tooltip from './Tooltip'
import {useState} from 'react'


const data = ({data}) => {
    const [visible, setVisible] = useState(false)

    function showTooltip() {
        setVisible(true)
    }

    function hideTooltip() {
        setVisible(false)
    }

    var umentionRegex = /@[a-zA-Z0-9_]+/g

    return (<div className={postStyle.post}>
        <div className={postStyle.avcontainer}>
            <img className={postStyle.av} src={data.author.avatar ? data.author.avatar : '/av.png'}></img>
        </div>
        <div className={postStyle.bodycontainer}>
        <div className={postStyle.author}>
            <span className={postStyle.displayName}>{data.author.displayName}</span>
            {data.author.verified ? <div className={postStyle.badge}></div> : ''}
            <span className={postStyle.username}>@{data.author.username}</span>
        </div>
            <span className={postStyle.content}>{data.body}</span>
        </div>
    </div>)
}

export default data;