//import postStyle from '../styles/Post.module.css'
import Tooltip from './Tooltip'
import {useState} from 'react'
import PostBody from './PostBody'
import Badge from '../icons/Badge'
import Post from './Post'
const data = ({data}) => {

    var ping = (
        <Post data={data.props.post}></Post>
    )

    return (<div>
        {data.type == 1 ? ping : ''}
    </div>)
}

export default data;