import navbarStyle from '../styles/Navbar.module.css'
import Link from 'next/link'


const Navbar = () => {
    return (<div>
        <ul className={navbarStyle.navbar}>
            <li className={navbarStyle.item}><Link href='/signup'>Sign Up</Link></li>
            <li className={navbarStyle.item}><Link href='/login'>Log In</Link></li>
        </ul>
    </div>)
}

export default Navbar;