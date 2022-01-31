import React from 'react'
import { API_BASE_URL, CDN_BASE_URL } from '../constants'
import Icon from '../icons/Icon'
import styles from '../styles/UserProfile.module.css'
import PostBody from './PostBody'
import VerifiedBadge from './VerifiedBadge'
export default function UserProfile({ user }) {
    return (
        <div className={styles.user}>
        <div className={styles.banner}>
        </div>
        <img className={styles.avatar} src={user.avatar ? `${CDN_BASE_URL}/avatars/${user.avatar}` : '/av.png'}></img>
        <div className={styles.userinfo}>
          <p>{user.displayName}{user.flags.verified ? <Icon name="badge" className={styles.badge} width="1rem"/> : ''}</p>
          <p className={styles.username}>@{user.username}</p>
        </div>
        <div className={styles.bio}><PostBody text={user.bio} ></PostBody></div>
      </div>
    )
}
