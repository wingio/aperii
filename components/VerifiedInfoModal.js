import React from 'react'
import Modal from './Modal'
import Icon from '../icons/Icon'
export default function VerifiedInfoModal({close, vanished}) {
    return (
        <Modal title="This acount is verified" buttons={[{label: 'OK', btnstyle: 'primary', onClick: close}]} showVanish={vanished}>
            <Icon name="badge" width="1.4rem"></Icon>
            This account is verified because it belongs to a company, influential figure or entertainer, or is an offical Aperii account.
        </Modal>
    )
}
