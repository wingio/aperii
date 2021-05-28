import React from 'react'
import Badge from './Badge'
import Calender from './Calender'
import User from './User'
import CreatePost from './CreatePost'
import Compass from './Compass'
import Home from './Home'
import Star from './Star'

/**
 * 
 * @param {*} param0 
 * @param  {React.SVGProps<SVGElement>} props 
 * @returns 
 */
export default function Icon(props) {
    var icon;
    const {name} = props
    switch(name){
        case 'user':
            icon = User
            break;
        case 'badge':
            icon = Badge
            break;
        case 'calender':
            icon = Calender
            break;
        case 'create-post':
            icon = CreatePost
            break;
        case 'compass':
            icon = Compass
            break;
        case 'home':
            icon = Home
            break;
        case 'star':
            icon = Star
            break;
        default:
            icon = User
    }

    return (
        <>{icon(props)}</>
    )
}
