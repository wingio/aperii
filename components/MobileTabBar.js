import React, {useState} from 'react'
import styles from '../styles/MobileTabBar.module.css'
import Icon from '../icons/Icon'
import { useRouter } from 'next/router'

export default function MobileTabBar({ currentPage, username, misc, fixed = true }) {
    return (
        <div className={styles.tabbar} style={{position: fixed ? 'fixed' : 'revert'}}>
            <div className={`${styles.tab} ${currentPage=="home" ? styles.active : ''}`}>
                <a href="/home" style={{width: "100%"}}>
                    <Icon name="home" className={styles.icon}></Icon>
                </a>
            </div>
            
            <div className={styles.tab}>
                <Icon name="compass" className={styles.icon}></Icon>
            </div>

            {misc["noti_tab_06_05_21"] == 1 ? <div className={`${styles.tab} ${currentPage=="notis" ? styles.active : ''}`}>
            <a href={`/notifications`} style={{width: "100%"}}>
                    <Icon name="bell" className={styles.icon}></Icon>
                </a>
            </div> : ''}
            
            <div className={`${styles.tab} ${currentPage=="profile" ? styles.active : ''}`}>
                <a href={`/@${username}`} style={{width: "100%"}}>
                    <Icon name="user" className={styles.icon}></Icon>
                </a>
            </div>
            
        </div>
    )
}
