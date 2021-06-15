import React, {useState} from 'react'
import Modal from './Modal'
import TextBox from './TextBox'
import ModalForm from './ModalForm'
import styles from '../styles/EditProfileModal.module.css'
export default function MakePostModal({ user, closeAction, showVanish }) {
    const [opened, setOpen] = useState(true)
    const [changes, setChanges] = useState({})
    const [User, setUser] = useState(user)
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


        //var base64 = await toBase64(body[0].files[0])
        //console.log(base64)
        fetch(`https://aperii.com/api/v1/users/${user.id}`, {
            body: JSON.stringify(changes),
            headers: {
                'content-type': 'application/json',
                authorization: localStorage.getItem('token')
            },
            method: 'PATCH'
        }).then(res => res.json()).then(json => {
            //close()
            //window.location = window.location
        })
    }

    const [source, setSource] = useState(User.avatar ? User.avatar : '/av.png')
    async function updatePreview(e) {
        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        setSource(await toBase64(e.target.files[0]))
        setChanges(changes['avatar'] = await toBase64(e.target.files[0]))
    }

    return (
        opened ? <Modal title="Edit your profile" buttons={[{label: 'Dismiss', btnstyle: 'secondary', onClick: close}, {label: 'Save', btnstyle: 'primary', form: "modal-postform", onClick: post, disabled: changes == {}}]} showVanish={showVanish}>
            <ModalForm onSubmit={post} id="modal-postform" style={{display:"flex", flexDirection: "column", alignItems: "center"}}>
                <label className={styles.avSelect}>
                    <input type="file" accept=".png, .jpg, .jpeg, .gif" multiple={false} onChange={updatePreview} style={{display: "hidden"}}/>
                    Select Image
                </label>
                <img src={source} width="100px" height="100px" style={{borderRadius: "50%"}}></img>
                <TextBox label="Display Name" style={{marginBottom: "10px"}} placeholder={user.displayName} onChange={(e) => { var ch = changes; ch.displayName = e.target.value; setChanges(ch)}}></TextBox>
                <TextBox label="Username" placeholder={user.username} onChange={(e) => { var ch = changes; ch.username = e.target.value; setChanges(ch)}}></TextBox>
            </ModalForm>
        </Modal> : <></>
    )
}
