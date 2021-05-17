import React, {useState} from 'react'
import Modal from './Modal'
import TextBox from './TextBox'
import ModalForm from './ModalForm'
export default function ExperimentsModal({ user, closeAction, exp }) {
    var close = closeAction
    const [value, setValue] = useState(exp)
    var update = (e) => {
        console.log(e.target.value)
        exp[e.target.name] = e.target.value
    }

    var save = () => {
        if(typeof window != "undefined"){
            localStorage.setItem('experiments', JSON.stringify(exp))
            close()
            location.href = location.href
        }
    }

    return (
        <Modal title="Feeling like a scientist?" subtitle="Try out new features before they're public" buttons={[{label: 'Dismiss', btnstyle: 'secondary', onClick: close}, {label: 'Save', btnstyle: 'primary', onClick: save}]}>
                <p style={{marginBottom: "0.2em"}}>New line support for textboxes</p>
                <p style={{fontSize: "0.7em", opacity: 0.5, marginTop:0}}>textbox_newline_05_17_21</p>
                <select name="textbox_newline_05_17_21" id="exp1" onChange={update} value={value["textbox_newline_05_17_21"] ? value["textbox_newline_05_17_21"] : "0"}>
                    <option value="0">Control</option>
                    <option value="1">Treatment 1</option>
                </select>
        </Modal>
    )
}
