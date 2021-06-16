import style from '../styles/Search.module.css'
import Link from 'next/link'


const Search = (props) => {
    return (<form className={`search-container${props.mobile ? '-mobile' : ''} sticky`}>
        {/* <input type='text' placeholder="Search..." className={style.search}></input> */}
        <b>Page Title</b>
    </form>)
}

export default Search;