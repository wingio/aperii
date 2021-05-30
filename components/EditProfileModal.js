import React, {useState} from 'react'
import Modal from './Modal'
import TextBox from './TextBox'
import ModalForm from './ModalForm'
export default function MakePostModal({ user, closeAction }) {
    const [opened, setOpen] = useState(true)

    var close = closeAction

    

    var post = async (e) => {
        e.preventDefault()
        var body = e.type == "click" ? e.target.form : e.target

        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });


        var base64 = await toBase64(body[0].files[0])
        //console.log(base64)
        fetch(`https://aperii.com/api/v1/users/${user.id}`, {
            body: JSON.stringify({
                avatar: base64
            }),
            headers: {
                'content-type': 'application/json',
                authorization: localStorage.getItem('token')
            },
            method: 'PATCH'
        }).then(res => res.json()).then(json => {
            close()
            window.location = window.location
        })
    }

    const [source, setSource] = useState(user.avatar ? user.avatar : '/av.png')
    async function updatePreview(e) {
        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        setSource(await toBase64(e.target.files[0]))
    }

    return (
        opened ? <Modal title="What's on your mind?" subtitle="To let everyone know, make a post!" buttons={[{label: 'Dismiss', btnstyle: 'secondary', onClick: close}, {label: 'Post', btnstyle: 'primary', form: "modal-postform", onClick: post}]}>
            <ModalForm onSubmit={post} id="modal-postform">
                <input type="file" accept=".png, .jpg, .jpeg, .gif" multiple={false} onChange={updatePreview} style={{display: "revert"}}/>
                <img src={source} width="100px"></img>
            </ModalForm>
        </Modal> : <></>
    )
}
