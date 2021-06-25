import React, {useState} from 'react'
import styles from '../styles/MobileTabBar.module.css'
import Icon from '../icons/Icon'
import { useRouter } from 'next/router'

export default function MobileTabBar({ currentPage, username, misc, fixed = true }) {
    const router = useRouter()
    function route(url){
        window.location.href = url
    }
    return (
        <div className={styles.tabbar} style={{position: fixed ? 'fixed' : 'revert'}}>
            <div className={`${styles.tab} ${currentPage=="home" ? styles.active : ''}`} onClick={route("/home")}>
                <Icon name="home" className={styles.icon}></Icon>
            </div>
            
            <div className={styles.tab}>
                <Icon name="compass" className={styles.icon}></Icon>
            </div>

            {misc["noti_tab_06_05_21"] == 1 ? <div className={`${styles.tab} ${currentPage=="notis" ? styles.active : ''}`} onClick={route("/notifications")}>
                <Icon name="bell" className={styles.icon}></Icon>
            </div> : ''}
            
            <div className={`${styles.tab} ${currentPage=="profile" ? styles.active : ''}`} onClick={route(`/p/${username}`)}>
                <Icon name="user" className={styles.icon}></Icon>
            </div>
            
        </div>
    )
}
