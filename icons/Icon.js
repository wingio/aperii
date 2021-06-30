import React from 'react'
import Badge from './Badge'
import Calender from './Calender'
import User from './User'
import CreatePost from './CreatePost'
import Compass from './Compass'
import Home from './Home'
import Star from './Star'
import Logo from './Logo'
import Bell from './Bell'
import Mention from './Mention'
import Bug from './Bug'
import Discord from './Discord'
import Gear from './Gear'
import Globe from './Globe'
import Sun from './Sun'
import Moon from './Moon'
import Flask from './Flask'
import Shapes from './Shapes'
import Arrow from './Arrow'
import Logout from './Logout'

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
        case 'logo':
            icon = Logo
            break;
        case 'bell':
            icon = Bell
            break;
        case 'mention':
            icon = Mention
            break;
        case 'bug':
            icon = Bug
            break;
        case 'discord':
            icon = Discord
            break;
        case 'gear':
            icon = Gear
            break;
        case 'globe':
            icon = Globe
            break;
        case 'moon':
            icon = Moon
            break;
        case 'sun':
            icon = Sun
            break;
        case 'flask':
            icon = Flask
            break;
        case 'shapes':
            icon = Shapes
            break;
        case 'arrow':
            icon = Arrow
            break;
        case 'logout':
            icon = Logout
            break;
        default:
            icon = User
    }

    return (
        <>{icon(props)}</>
    )
}
