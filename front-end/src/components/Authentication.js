import "../styles/Authentication.css"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import ToolTip from "./ToolTip"
import axios from "axios";
import { validateEmail } from "../Helper/Form";
import { useEffect } from "react";
import { emailToolTipRenderer } from "../Helper/Form";
import { changeUserId } from "../features/idSlice";

import { useNavigate } from "react-router-dom";

//make email database search depend on physical button press by user
//move email validation to form Helper since it will no longer be using fetch


function Authetication({ authType, authTitle, passwordHeader, buttonText }) {
    //authType = Sign up when true and Login when false
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validEmail, setValidEmail] = useState(false);
    const [foundUser, setFoundUser] = useState(undefined)
    const [emailState, setEmailState] = useState(undefined)

    useEffect(() => {
        if (validateEmail(email)) {
            setEmailState(true)
        }
        else if (email == "") {
            setEmailState(undefined)
        }
        else if (!validateEmail(email)) {
            setEmailState(false);
        }
        // else if (validateEmail(email) && foundUser == undefined) {
        //     
        // }
    }, [email])

 
    const searchUser = () => {
        if (emailState === true) {
            axios.get(`${process.env.REACT_APP_BASE_URL}Users?email=${email}`).then(r => setFoundUser(r.data));
        }
    }

    useEffect(() => {
    if(foundUser != undefined)
    {
    if (emailState && foundUser.length > 0) {
            dispatch(changeUserId(foundUser[0].id))
            navigate({
            pathname:"/dashboard",
            search:"?id=" + foundUser[0].id
            })
    }
    else if(foundUser.length == 0)
    {
        setEmailState("notfound")
    }
    }

    },[foundUser])

    // useEffect(() => {
    //     //|| foundUser.length == 0

    // }, [fo])


    return (
        <>
            <div className="auth-page">
                <section className="form-change">
                    <Link to="/sign-up"><button className={authType ? "form-change-active" : "form-change-inactive"}>Sign up</button></Link>
                    <Link to="/login"><button className={!authType ? "form-change-active" : "form-change-inactive"}>Login</button></Link>


                </section>
                <section className="auth-container">
                    <div className="auth-title">{authTitle}</div>
                    <form className="auth-form">
                        <p className="input-header">Your email address:</p>
                        {emailToolTipRenderer(emailState)}
                        <input placeholder="email address" type="email" onChange={(e) => setEmail(e.target.value)}></input>
                        <p className="input-header" id="password-header">{passwordHeader}</p>
                        <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}></input>
                        <button onClick={(e) => {
                            e.preventDefault();
                            searchUser()

                        }}>{buttonText}</button>

                    </form>
                </section>
            </div>
        </>

    )
}

export default Authetication;