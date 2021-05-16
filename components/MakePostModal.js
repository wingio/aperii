import React from 'react'
import Modal from './Modal'
import TextBox from './TextBox'
export default function MakePostModal() {
    return (
        <Modal title="What's on your mind?" subtitle="To let everyone know, make a post!" primaryLabel="Post">
            <TextBox></TextBox>
        </Modal>
    )
}
