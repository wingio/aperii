import styles from '../styles/Noti.module.css'
import Tooltip from './Tooltip'
import {useState} from 'react'
import PostBody from './PostBody'
import Badge from '../icons/Badge'
import Icon from '../icons/Icon'
import Post from './Post'
const data = ({data}) => {

    var ping = (
        <>
            <div className={styles.iconarea}><div className={styles.icon}><Icon name="mention" style={{color: "white"}} width="1.3rem"/></div></div>
            <div className={styles.notinfo}>{<p style={{margin: 0}}><b>{data.props.post.author.displayName}</b> has mentioned you in a post</p>}</div>
            <div className={styles.content}><Post data={data.props.post} embed={true}></Post></div>
        </>
    )

    var info = (
        <>
            <div className={styles.iconarea}><div className={styles.icon}><Icon name="bell" style={{color: "white"}} width="1.3rem"/></div></div>
            <div className={styles.notinfo}>{<p style={{margin: 0}}>Welcome to Aperii!</p>}</div>
            <div className={styles.content}><Post data={data.props.post} embed={true}></Post></div>
        </>
    )

    return (<div className={styles.noti}>
        {data.type == -1 ? info : data.type == 0 ? ping : ''}
    </div>)
}

export default data;