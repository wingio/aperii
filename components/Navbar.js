import navbarStyle from '../styles/Navbar.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
const Navbar = () => {
    return (<div>
        <ul className={navbarStyle.navbar}>
            <li className={navbarStyle.item}><a href='/signup'>Sign Up</a></li>
            <li className={navbarStyle.item}><a href='/login'>Log In</a></li>
            <li className={`${navbarStyle.item} ${navbarStyle.icon}`}><a href='https://discord.gg/Mryxr7zVtc' target="_blank"><FontAwesomeIcon icon={faDiscord} color="#fff"></FontAwesomeIcon></a></li>
            <li className={`${navbarStyle.item} ${navbarStyle.icon}`}><a href='https://instagram.com/aperiiapp' target="_blank"><FontAwesomeIcon icon={faInstagram} color="#fff"></FontAwesomeIcon></a></li>
            <li className={`${navbarStyle.item} ${navbarStyle.icon}`}><a href='https://twitter.com/aperiiapp' target="_blank"><FontAwesomeIcon icon={faTwitter} color="#fff"></FontAwesomeIcon></a></li>
        </ul>
    </div>)
}

export default Navbar;