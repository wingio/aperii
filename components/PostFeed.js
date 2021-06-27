import React from 'react'
import Post from './Post'

export default function PostFeed({ posts, useTwemoji }) {
    posts.sort((a, b) => {
        return (a.createdTimestamp > b.createdTimestamp) ? -1 : (a.createdTimestamp > b.createdTimestamp) ? 1 : 0 
    })
    return (
        <div>
            {posts.map(p => <Post data={p} key={p.id} useTwemoji={useTwemoji}></Post>)}
        </div>
    )
}
