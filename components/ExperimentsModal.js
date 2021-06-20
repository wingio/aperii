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
        setValue(exp)
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
                <p style={{marginBottom: "0.2em", color: "var(--text-color)"}}>Settings page</p>
                <p style={{fontSize: "0.7em", opacity: 0.5, marginTop:0, color: "var(--text-color)"}}>settings_page_06_20_21</p>
                <select name="settings_page_06_20_21" id="exp4" onChange={update} defaultValue={value["settings_page_06_20_21"] ? value["settings_page_06_20_21"] : "0"}>
                    <option value="0">Control</option>
                    <option value="1">Treatment 1</option>
                </select>
                <p style={{marginBottom: "0.2em", color: "var(--text-color)"}}>Notification tab</p>
                <p style={{fontSize: "0.7em", opacity: 0.5, marginTop:0, color: "var(--text-color)"}}>noti_tab_06_05_21</p>
                <select name="noti_tab_06_05_21" id="exp3" onChange={update} defaultValue={value["noti_tab_06_05_21"] ? value["noti_tab_06_05_21"] : "0"}>
                    <option value="0">Control</option>
                    <option value="1">Treatment 1</option>
                </select>
                <p style={{marginBottom: "0.2em", color: "var(--text-color)"}}>New mobile layout</p>
                <p style={{fontSize: "0.7em", opacity: 0.5, marginTop:0, color: "var(--text-color)"}}>mobile_layout_05_18_21</p>
                <select name="mobile_layout_05_18_21" id="exp2" onChange={update} defaultValue={value["mobile_layout_05_18_21"] ? value["mobile_layout_05_18_21"] : "0"}>
                    <option value="0">Control</option>
                    <option value="1">Treatment 1</option>
                </select>
                <p style={{marginBottom: "0.2em", color: "var(--text-color)"}}>New line support for textboxes</p>
                <p style={{fontSize: "0.7em", opacity: 0.5, marginTop:0, color: "var(--text-color)"}}>textbox_newline_05_17_21</p>
                <select name="textbox_newline_05_17_21" id="exp1" onChange={update} defaultValue={value["textbox_newline_05_17_21"] ? value["textbox_newline_05_17_21"] : "0"}>
                    <option value="0">Control</option>
                    <option value="1">Treatment 1</option>
                </select>
        </Modal>
    )
}
