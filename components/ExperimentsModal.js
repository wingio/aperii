import React, {useState} from 'react'
import Modal from './Modal'
import TextBox from './TextBox'
import ModalForm from './ModalForm'
export default function ExperimentsModal({ user, closeAction }) {
    var close = closeAction

    var save = (e) => {
        console.log(e)
    }

    return (
        <Modal title="Feeling like a scientist?" subtitle="Try out new features before they're public" buttons={[{label: 'Dismiss', btnstyle: 'secondary', onClick: close}, {label: 'Save', btnstyle: 'primary', form: "modal-exp", onClick: save}]}>
            <ModalForm onSubmit={post} id="modal-exp">
                <p style={{marginBottom: "0.2em"}}>New line support for textboxes</p>
                <p style={{fontSize: "0.7em", opacity: 0.5, marginTop:0}}>textbox_newline_05_17_21</p>
                <select name="experiment1" id="exp1">
                    <option value="">Control</option>
                    <option value="1">Treatment 1</option>
                </select>
            </ModalForm>
        </Modal>
    )
}
