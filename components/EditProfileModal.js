import React, {useState} from 'react'
import Modal from './Modal'
import TextBox from './TextBox'
import ModalForm from './ModalForm'
export default function MakePostModal({ user, closeAction }) {
    const [opened, setOpen] = useState(true)

    var close = closeAction

    

    var post = (e) => {
        e.preventDefault()
        var body = e.type == "click" ? e.target.form : e.target

        var reader = new FileReader();
        // function _arrayBufferToBase64( buffer ) {
        //     var binary = '';
        //     var bytes = new Uint8Array( buffer );
        //     var len = bytes.byteLength;
        //     for (var i = 0; i < len; i++) {
        //         binary += String.fromCharCode( bytes[ i ] );
        //     }
        //     return window.btoa( binary );
        // }
        // reader.onload = function () {
        //     var arrayBuffer = this.result;
        //     console.log(arrayBuffer);
        //     return _arrayBufferToBase64(arrayBuffer)
        // }


        var base64 = reader.readAsDataURL(body[0].files[0])
        console.log(base64)
        // fetch(`https://aperii.com/api/v1/users/${user.id}`, {
        //     body: JSON.stringify({
        //         avatar: `data:${body[0].files[0].type};base64,${base64}`
        //     }),
        //     headers: {
        //         'content-type': 'application/json',
        //         authorization: localStorage.getItem('token')
        //     },
        //     method: 'PATCH'
        // }).then(res => res.json()).then(json => {
        //     close()
        //     window.location = window.location
        // })
    }

    return (
        opened ? <Modal title="What's on your mind?" subtitle="To let everyone know, make a post!" buttons={[{label: 'Dismiss', btnstyle: 'secondary', onClick: close}, {label: 'Post', btnstyle: 'primary', form: "modal-postform", onClick: post}]}>
            <ModalForm onSubmit={post} id="modal-postform">
                <input type="file" accept=".png, .jpg, .jpeg, .gif" />
            </ModalForm>
        </Modal> : <></>
    )
}
