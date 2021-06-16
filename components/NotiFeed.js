import React from 'react'
import Noti from './Noti'

export default function NotiFeed({ notis, user }) {
    notis = notis.length > 0 ? notis : [
        {
            "owner": "1",
            "id": "1",
            "type": -1,
            "createdTimestamp": Date.now(),
            "read": false,
            "props": {
                "post": {
                    "id": "2",
                    "createdTimestamp": Date.now(),
                    "author": {
                        "id": "3",
                        "joinedTimestamp": Date.now(),
                        "displayName": "Aperii",
                        "username": "aperii",
                        "verified": true,
                        "avatar": "https://aperii.com/api/usercontent/avatars/72457234678237955171",
                        "flags": 26
                    },
                    "body": `@${user.username} 👋`,
                    "media": [
                        null
                    ]
                }
            }
        }
    ]
    notis.sort((a, b) => {
        return (a.createdTimestamp > b.createdTimestamp) ? -1 : (a.createdTimestamp > b.createdTimestamp) ? 1 : 0 
    })
    return (
        <div>
            {notis.map(p => <Noti data={p} key={p.id}></Noti>)}
        </div>
    )
}
