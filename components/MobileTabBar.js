import React, {useState} from 'react'
import styles from '../styles/MobileTabBar.module.css'
import Icon from '../icons/Icon'

export default function MobileTabBar({ currentPage, username }) {
    const [showNoti, setShowNoti] = useState(false)
    if(typeof window != "undefined"){
        const exp = localStorage.getItem("experiments")
        if(exp){
            setShowNoti(exp["noti_tab_06_05_21"] == 1)
        }
    }

    return (
        <div className={styles.tabbar}>
            <div className={`${styles.tab} ${currentPage=="home" ? styles.active : ''}`}>
                <a href="/home" style={{width: "100%"}}>
                    <Icon name="home" className={styles.icon}></Icon>
                </a>
            </div>
            
            <div className={styles.tab}>
                <Icon name="compass" className={styles.icon}></Icon>
            </div>

            {showNoti ? <div className={styles.tab}>
                <Icon name="bell" className={styles.icon}></Icon>
            </div> : ''}
            
            <div className={`${styles.tab} ${currentPage=="profile" ? styles.active : ''}`}>
                <a href={`/p/${username}`} style={{width: "100%"}}>
                    <Icon name="user" className={styles.icon}></Icon>
                </a>
            </div>
            
        </div>
    )
}
