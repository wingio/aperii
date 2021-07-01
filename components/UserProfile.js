import React from 'react'
import styles from '../styles/UserProfile.module.css'
import PostBody from './PostBody'
import VerifiedBadge from './VerifiedBadge'
export default function UserProfile({ user }) {
    return (
        <div className={styles.user}>
        <div className={styles.banner}>
        </div>
        <img className={styles.avatar} src={user.avatar ? user.avatar : '/av.png'}></img>
        <div className={styles.userinfo}>
          <p>{user.displayName}{user.verified ? <VerifiedBadge className={styles.badge} /> : ''}</p>
          <p className={styles.username}>@{user.username}</p>
        </div>
        <div className={styles.bio}><PostBody text={user.bio} useTwemoji={expStore["use_twemoji_06_26_21"] == 1}></PostBody></div>
      </div>
    )
}
