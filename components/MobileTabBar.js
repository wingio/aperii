import React from 'react'
import styles from '../styles/MobileTabBar.module.css'
export default function MobileTabBar({ currentPage }) {
    return (
        <div className={styles.tabbar}>
            <div className={`${styles.tab} ${currentPage=="home" ? styles.active : ''}`}>
                <img src="/icons/home.svg"></img>
            </div>
            <div className={styles.tab}>
                <img src="/icons/compass.svg"></img>
            </div>
            <div className={`${styles.tab} ${currentPage=="profile" ? styles.active : ''}`}>
                <img src="/icons/user.svg"></img>
            </div>
        </div>
    )
}
