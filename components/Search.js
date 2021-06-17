import style from '../styles/Search.module.css'
import Link from 'next/link'
import Icon from '../icons/Icon'

const Search = (props) => {
    return (<div className={`search-container${props.mobile ? '-mobile' : ''} sticky`}>
        <div>
            <h3 style={{margin: 0, marginLeft: "1em", color:"white"}}>{props.title} {props.showBadge ? <Icon name="badge" width="1.1rem" style={{marginBottom: "-.1em"}} /> : ''}</h3>
            {props.showPosts ? <p style={{margin: 0, color: "#888", marginLeft: "20px"}}>{props.postCount} posts</p>: ''}
        </div>
    </div>)
}

export default Search;