import React, {useState} from 'react'
import Modal from './Modal'
import TextBox from './TextBox'
export default function MakePostModal() {
    const [opened, setOpen] = useState(true)
    var close = () => {
        setOpen(false)
    }
    return (
        opened ? <Modal title="What's on your mind?" subtitle="To let everyone know, make a post!" buttons={[{label: 'Dismiss', btnstyle: 'secondary', onClick: close}, {label: 'Post', btnstyle: 'primary', onClick: close}]}>
            <TextBox></TextBox>
        </Modal> : <></>
    )
}
