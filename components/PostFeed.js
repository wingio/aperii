import React from 'react'

export default function PostFeed({ posts }) {
    return (
        <div>
            {posts.map(p => <Post data={p} key={p.id}></Post>)}
        </div>
    )
}
