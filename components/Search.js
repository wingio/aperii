import style from '../styles/Search.module.css'
import Link from 'next/link'


const Search = (props) => {
    return (<form className={`search-container${props.mobile ? '-mobile' : ''} sticky`}>
        {/* <input type='text' placeholder="Search..." className={style.search}></input> */}
        <h3 style={{margin: 0, marginLeft: "1em", color:"white"}}>{props.title}</h3>
    </form>)
}

export default Search;