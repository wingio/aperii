import React, {useState} from 'react'
import Modal from './Modal'
import TextBox from './TextBox'
import ModalForm from './ModalForm'
import { useRouter } from 'next/router'
export default function MakePostModal({ user, closeAction, showVanish }) {
    const [opened, setOpen] = useState(true)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    var close = closeAction

    var post = (e) => {
        e.preventDefault()
        setLoading(true)
        var body = e.type == "click" ? e.target.form[0].value : e.target[0].value

        fetch(`https://aperii.com/api/v1/users/${user.id}/posts`, {
            body: JSON.stringify({
                body
            }),
            headers: {
                'content-type': 'application/json',
                authorization: localStorage.getItem('token')
            },
            method: 'POST'
        }).then(res => res.json()).then(json => {
            setLoading(false)
            close()
            router.push('/home')
        })
    }

    return (
        opened ? <Modal title="What's on your mind?" subtitle="To let everyone know, make a post!" buttons={[{label: 'Dismiss', btnstyle: 'secondary', onClick: close}, {label: 'Post', btnstyle: 'primary', form: "modal-postform", onClick: post, loading: loading}]} showVanish={showVanish}>
            <ModalForm onSubmit={post} id="modal-postform">
                <TextBox></TextBox>
            </ModalForm>
        </Modal> : <></>
    )
}
