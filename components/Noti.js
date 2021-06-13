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
            <div style={{display: "flex"}}><Icon name="mention" fill="var(--rust-blood)" style={{marginRight: ".4em"}}/> {`${data.props.post.author.displayName} has mentioned you in a post`}</div>
            <Post data={data.props.post}></Post>
        </>
    )

    return (<div className={styles.noti}>
        {data.type == 0 ? ping : ''}
    </div>)
}

export default data;