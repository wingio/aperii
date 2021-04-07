import navbarStyle from '../styles/Navbar.module.css'
import Link from 'next/link'


const Navbar = () => {
    return (<div>
        <ul className={navbarStyle.navbar}>
            <li className={navbarStyle.item}><Link href='/'><span className={navbarStyle.logo}></span></Link></li>
        </ul>
    </div>)
}

export default Navbar;