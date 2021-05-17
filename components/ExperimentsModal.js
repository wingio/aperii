import React, {useState} from 'react'
import Modal from './Modal'
import TextBox from './TextBox'
import ModalForm from './ModalForm'
export default function ExperimentsModal({ user, closeAction, exp }) {
    var close = closeAction

    var save = (e) => {
        e.preventDefault()
        console.log(e)
        const experiments = [
            "textbox_newline_05_17_21"
        ]
        
        for(val in e.target.form.children[val]){
            if(experiments.includes(val)){
                console.log(e.target.form.children[val].val)
            }
        }

    }

    return (
        <Modal title="Feeling like a scientist?" subtitle="Try out new features before they're public" buttons={[{label: 'Dismiss', btnstyle: 'secondary', onClick: close}, {label: 'Save', btnstyle: 'primary', form: "modal-exp", onClick: save}]}>
            <ModalForm id="modal-exp">
                <p style={{marginBottom: "0.2em"}}>New line support for textboxes</p>
                <p style={{fontSize: "0.7em", opacity: 0.5, marginTop:0}}>textbox_newline_05_17_21</p>
                <select name="textbox_newline_05_17_21" id="exp1">
                    <option value="0">Control</option>
                    <option value="1">Treatment 1</option>
                </select>
            </ModalForm>
        </Modal>
    )
}
