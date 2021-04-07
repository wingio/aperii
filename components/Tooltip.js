import styles from '../styles/Tooltip.module.css'
import Link from 'next/link'


const Tooltip = ({text}) => {
    return (<div className={`${styles.tooltip}`}>
        {text}
    </div>)
}

export default Tooltip;