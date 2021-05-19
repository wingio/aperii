import React from 'react'
import styles from '../styles/MobileTabBar.module.css'
import Icon from '../icons/Icon'
export default function MobileTabBar({ currentPage }) {
    return (
        <div className={styles.tabbar}>
            <div className={`${styles.tab} ${currentPage=="home" ? styles.active : ''}`}>
                <Icon name="home" className={styles.icon}></Icon>
            </div>
            <div className={styles.tab}>
                <Icon name="compass" className={styles.icon}></Icon>
            </div>
            <div className={`${styles.tab} ${currentPage=="profile" ? styles.active : ''}`}>
                <Icon name="user" className={styles.icon}></Icon>
            </div>
        </div>
    )
}
