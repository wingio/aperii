import React, {useState} from 'react'
import Modal from './Modal'
import TextBox from './TextBox'
import ModalForm from './ModalForm'
export default function MakePostModal() {
    const [opened, setOpen] = useState(true)

    var close = () => {
        setOpen(false)
    }
    var post = (e) => {
        e.preventDefault()
        console.log(e)
    }

    return (
        opened ? <Modal title="What's on your mind?" subtitle="To let everyone know, make a post!" buttons={[{label: 'Dismiss', btnstyle: 'secondary', onClick: close}, {label: 'Post', btnstyle: 'primary', onClick: post}]}>
            <ModalForm onSubmit={post}>
                <TextBox></TextBox>
            </ModalForm>
        </Modal> : <></>
    )
}
