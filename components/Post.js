import postStyle from '../styles/Post.module.css'
import Tooltip from './Tooltip'
import {useState} from 'react'
import PostBody from './PostBody'
import Badge from '../icons/Badge'
import ContextMenu from './ContextMenu'
import moment from 'moment'
import {useRouter} from 'next/router'

const data = ({data, embed, useTwemoji, big=false, isreply=false, issubject=false}) => {
    const [visible, setVisible] = useState(false)
    const [coords, setCoords] = useState({x: 0, y: 0})

    function openContext(e){
        e.preventDefault()
        console.log(e)
        setVisible(!visible)
        setCoords({x: e.clientX, y: e.clientY})
    }

    var umentionRegex = /@[a-zA-Z0-9_]+/g

    if(big) {
        return (<div className={postStyle.bigpost + ` ${embed ? postStyle.embed : isreply ? postStyle.reply : ''}`} >
        <div className={postStyle.bigauthor}>
            <div className={postStyle.avcontainer}>
                <img className={postStyle.avbig} src={data.author.avatar ? data.author.avatar : '/av.png'}></img>
            </div>
            <div style={{display: "flex", flexDirection: "column", marginLeft: "8px"}}>
                <a href={`/p/${data.author.username}`}><span className={postStyle.displayName}>{data.author.displayName}</span>{data.author.flags.verified ? <Badge className={postStyle.badge} width="15px" style={{color: "var(--badge-color)"}}></Badge> : ''}</a>
                <span className={postStyle.username} style={{marginLeft: 0}}>@{data.author.username}</span>
            </div>
        </div>
        <div style={{gridArea: "content", marginTop: "10px"}}>
            {isreply ? <span style={{color: "#888", fontSize: ".9em"}}>Replying to <a href={`/p/${data.in_reply_to.author.username}`} style={{color: "#4eafff"}}>{`@${data.in_reply_to.author.username}`}</a></span> : ''}
            <p className={postStyle.bigcontent}><PostBody text={data.body} useTwemoji={useTwemoji}></PostBody></p>
        </div>
        <span style={{color: "#888", fontSize: ".9em", marginTop: "20px"}}>{moment(data.createdTimestamp).format("MM/DD/YY h:mma")} {data.author.pronouns ? `• ${data.author.pronouns}` : ''}</span>
        {visible ? <ContextMenu {...coords}></ContextMenu> : ''}
    </div>)
    }
    const router = useRouter()
    return (<div className={postStyle.post + ` ${embed ? postStyle.embed : issubject ? postStyle.subj : ''}`} onClick={() => {router.push('/p/[username]/p/[id]', `/p/${data.author.username}/p/${data.id}`)}}>
        <div className={postStyle.avcontainer}>
            <img className={postStyle.av} src={data.author.avatar ? data.author.avatar : '/av.png'}></img>
        </div>
        <div className={postStyle.bodycontainer}>
        <div className={postStyle.author}>
            <a href={`/p/${data.author.username}`}><span className={postStyle.displayName}>{data.author.displayName}</span></a>
            {data.author.flags.verified ? <Badge className={postStyle.badge} width="15px" style={{color: "var(--badge-color)"}}></Badge> : ''}
            <span className={postStyle.username}>@{data.author.username}</span>

            <span className={postStyle.timestamp}>• {(Date.now() - data.createdTimestamp > 1000 * 60 * 60 * 24 * 2) ? moment(data.createdTimestamp).format("DD MMM") : moment(data.createdTimestamp).fromNow()}</span>
            <span className={postStyle.timestamp}>{data.author.pronouns ? `• ${data.author.pronouns}` : ''}</span>
        </div>
            <p className={postStyle.content}><PostBody text={data.body} useTwemoji={useTwemoji}></PostBody></p>
        </div>
        {visible ? <ContextMenu {...coords}></ContextMenu> : ''}
    </div>)
}

export default data;