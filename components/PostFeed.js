import React from 'react'
import Post from './Post'

export default function PostFeed({ posts }) {
    return (
        <div>
            {posts.map(p => <Post data={p} key={p.id}></Post>)}
        </div>
    )
}
