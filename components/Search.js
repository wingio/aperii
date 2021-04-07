import style from '../styles/Search.module.css'
import Link from 'next/link'


const Search = () => {
    return (<form>
        <input type='text' placeholder="Search..." className={style.search}></input>
    </form>)
}

export default Search;