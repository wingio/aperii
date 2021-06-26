import React, {useState} from 'react'
import Modal from './Modal'
import TextBox from './TextBox'
import ModalForm from './ModalForm'
import Button from './Button'
import RichTextbox from './RichTextbox'
export default function PlaygroundModal({ user, closeAction, exp }) {
    var close = closeAction

    return (
        <Modal title="UI Playground" subtitle="Explore and test ui elements" buttons={[{label: 'OK', btnstyle: 'primary', onClick: close, disabled: false}]}>
                <Button label="Primary" btnstyle="primary" style={{marginRight: "10px", marginBottom: "10px"}} disabled={false}></Button>
                <Button label="Primary Disabled" btnstyle="primary" disabled={true} style={{marginRight: "10px"}}></Button>
                <Button label="Loading" btnstyle="primary" loading={true} style={{marginRight: "10px"}}></Button>
                <Button label="Secondary" btnstyle="secondary" disabled={false}></Button>
                <p>Regular Textbox</p>
                <TextBox></TextBox>
                <p>Rich Textbox</p>
                <RichTextbox></RichTextbox>
        </Modal>
    )
}
