import React from 'react'
import Noti from './Noti'

export default function NotiFeed({ notis }) {
    notis.sort((a, b) => {
        return (a.createdTimestamp > b.createdTimestamp) ? -1 : (a.createdTimestamp > b.createdTimestamp) ? 1 : 0 
    })
    return (
        <div>
            {notis.map(p => <Noti data={p} key={p.id}></Noti>)}
        </div>
    )
}
