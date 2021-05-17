import React, {useState} from 'react'
import Modal from './Modal'
import TextBox from './TextBox'
import ModalForm from './ModalForm'
export default function MakePostModal({ user, closeAction }) {
    var close = closeAction

    var post = (e) => {
        e.preventDefault()
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
            close()
            window.location = '/home'
        })
    }

    return (
        <Modal title="What's on your mind?" subtitle="To let everyone know, make a post!" buttons={[{label: 'Dismiss', btnstyle: 'secondary', onClick: close}, {label: 'Post', btnstyle: 'primary', form: "modal-postform", onClick: post}]}>
            <ModalForm onSubmit={post} id="modal-postform">
                <p>New line support for textboxes</p>
                <p style={{fontSize: "0.5em", opacity: 0.5}}>textbox_newline_05_17_21</p>
                <select name="experiment1" id="exp1">
                    <option value="">Control</option>
                    <option value="1">Treatment 1</option>
                </select>
            </ModalForm>
        </Modal>
    )
}
