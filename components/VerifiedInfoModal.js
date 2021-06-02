import React from 'react'
import Modal from './Modal'
import Icon from '../icons/Icon'
import styles from '../styles/VerifiedInfoModal.module.css'
export default function VerifiedInfoModal({close, vanished}) {
    return (
        <Modal buttons={[{label: 'OK', btnstyle: 'primary', onClick: close}]} showVanish={vanished}>
            <section>
                <Icon name="badge" width="3rem" style={{marginBottom: "10px"}}></Icon>
                This account is verified because it belongs to a company, influential figure, or is an offical Aperii account.
            </section>
        </Modal>
    )
}
