import style from '../styles/Search.module.css'
import Link from 'next/link'


const Search = (props) => {
    return (<form className={`search-container${props.mobile ? '-mobile' : ''} sticky`}>
        <input type='text' placeholder="Search..." className={style.search}></input>
    </form>)
}

export default Search;