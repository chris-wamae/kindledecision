import axios from "axios";
import { useState } from "react";
import "../styles/DeleteAccount.css"
import { useNavigate } from "react-router-dom";

function DeleteAccount() {

    const [showCredentialsForm, setShowCredentialsForm] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const deleteAccount = () => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}account/delete-account`, {
            data: {
                email: email,
                password: password
            }}).then(r => {
            if(r.status == 204)
            {
            navigate("/")
            }
            })
        }

    return (
        <div className="del-acc-container">
            {
                !showCredentialsForm ?
                    <button className="del-prompt-activate-btn" onClick={() => setShowCredentialsForm(true)}>Delete Account</button>
                    :
                    <span></span>
            }

            {
                showCredentialsForm ?
                    <form className="delete-form">
                        <div>You need to authorize this action:</div>
                        <div>Account email</div>
                        <input type="email" placeholder="Please enter your email" onChange={(e) => setEmail(e.target.value)}></input>
                        <div>Account password</div>
                        <input type="password" placeholder="Please enter your password" onChange={(e) => setPassword(e.target.value)}></input>
                        <div className="btns-cont">
                            <button onClick={(e) => {
                                e.preventDefault()
                                deleteAccount() }}>Delete</button>
                            <button onClick={(e) => {
                                e.preventDefault()
                                setShowCredentialsForm(false)
                            }}>Cancel</button>
                        </div>

                    </form>
                    :
                    <span></span>
            }
        </div>
    )
}

export default DeleteAccount;