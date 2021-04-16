import navbarStyle from '../styles/Navbar.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
const Navbar = () => {
    return (<div>
        <ul className={navbarStyle.navbar}>
            <li className={navbarStyle.item}><Link href='/signup'>Sign Up</Link></li>
            <li className={navbarStyle.item}><Link href='/login'>Log In</Link></li>
            <li className={navbarStyle.item}><Link href='https://discord.gg/Mryxr7zVtc'><FontAwesomeIcon icon={faDiscord} color="#fff"></FontAwesomeIcon></Link></li>
            <li className={navbarStyle.item}><Link href='https://instagram.com/aperiiapp'><FontAwesomeIcon icon={faInstagram} color="#fff"></FontAwesomeIcon></Link></li>
            <li className={navbarStyle.item}><Link href='https://twitter.com/aperiiapp'><FontAwesomeIcon icon={faTwitter} color="#fff"></FontAwesomeIcon></Link></li>
        </ul>
    </div>)
}

export default Navbar;