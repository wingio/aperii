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
            <div className={styles.notinfo}><Icon name="mention" style={{marginRight: ".4em", color: "var(--rust-blood)"}} width="1.3rem"/> {<b>{data.props.post.author.displayName}</b> + ` has mentioned you in a post`}</div>
            <div className={styles.content}><Post data={data.props.post}></Post></div>
        </>
    )

    return (<div className={styles.noti}>
        {data.type == 0 ? ping : ''}
    </div>)
}

export default data;