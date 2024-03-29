import React, {useState, useEffect} from 'react'
import Modal from './Modal'
import TextBox from './TextBox'
import ModalForm from './ModalForm'
import styles from '../styles/EditProfileModal.module.css'
import { useRouter } from 'next/router'
import useLang from '../providers/useLang'
import { API_BASE_URL, CDN_BASE_URL } from '../constants'
export default function MakePostModal({ user, closeAction, showVanish }) {
    const [User, setUser] = useState(user)
    const [changes, setChanges] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [avatar, setAvatar] = useState()
    const [error, setError] = useState({})
    var close = closeAction
    const router = useRouter()
    const lang = useLang()
    const [text, setText] = useState(lang)

    var post = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        var body = e.type == "click" ? e.target.form : e.target

        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
        let fdata = new FormData()
        if(avatar){
            fdata.append('avatar', avatar)
        }
        for(var key in changes) {
            fdata.append(key, changes[key])
        }
        fetch(`${API_BASE_URL}/users/${user.id}`, {
            body: fdata,
            headers: {
                authorization: localStorage.getItem('token')
            },
            method: 'PATCH'
        }).then(res => res.json()).then(json => {
            setUser(json.profile)
            setIsLoading(false)
            if(!json.errors){
                setError({})
                setChanges({})
                router.push(`/@${json.profile.username}`)
                close()
            } else {
                setError(json.errors[0])
            }
        })
    }

    const [source, setSource] = useState(User.avatar ? `${CDN_BASE_URL}/avatars/${User.avatar}` : '/av.png')
    async function updatePreview(e) {
        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        setSource(await toBase64(e.target.files[0]))
        var ch = changes
        setAvatar(e.target.files[0])
        ch.made = true
        setChanges(ch)
    }

    return (
        <Modal title={text.profile.edit} buttons={[{label: text.buttons.dismiss, btnstyle: 'secondary', onClick: close}, {label: text.buttons.save, btnstyle: 'primary', form: "modal-postform", onClick: post, loading: isLoading}]} showVanish={showVanish}>
            <ModalForm onSubmit={post} id="modal-postform" style={{display:"flex", flexDirection: "column", alignItems: "center"}}>
                <label className={styles.avSelect}>
                    <input type="file" accept=".png, .jpg, .jpeg, .gif" multiple={false} onChange={updatePreview} style={{display: "hidden"}}/>
                    Select Image
                </label>
                <img src={source} width="100px" height="100px" style={{borderRadius: "50%"}}></img>
                <TextBox label={text.displayName} style={{marginBottom: "10px"}} placeholder={user.displayName} onChange={(e) => { var chngs = changes; chngs.displayName = e.target.value; setChanges(chngs)}}></TextBox>
                <TextBox label={text.username} placeholder={user.username} onChange={(e) => { var ch = changes; ch.username = e.target.value; setChanges(ch)}}></TextBox>
                <TextBox label={text.profile.bio} placeholder={user.bio} onChange={(e) => { var ch = changes; ch.bio = e.target.value; setChanges(ch)}}></TextBox>
                <TextBox label={"Pronouns"} placeholder={user.pronouns || "Pronouns"} onChange={(e) => { var ch = changes; ch.pronouns = e.target.value; setChanges(ch)}}></TextBox>
            </ModalForm>
            {error.error ? <p className="errorText" style={{color: "var(--text-color)"}}>{error.error}</p> : ''}
        </Modal>
    )
}
