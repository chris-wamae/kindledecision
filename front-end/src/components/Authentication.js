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
import { useSelector } from "react-redux";
import { loginPost, loginState } from "../features/loginSlice";
import { signUpState, signupPost } from "../features/signupSlice";
import { useNavigate } from "react-router-dom";

//make email database search depend on physical button press by user
//move email validation to form Helper since it will no longer be using fetch


function Authetication({ authType, authTitle, passwordHeader, buttonText }) {
    //authType = Sign up when true and Login when false
    const dispatch = useDispatch()
    const loggedUser = useSelector(loginState);
    const signupState = useSelector(signUpState);
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailState, setEmailState] = useState(undefined)
    const [username, setUsername] = useState("")
    const [phone, setPhone] = useState("")
    const [viewmode, setViewmode] = useState(undefined)
    const [userVisibility, setUserVisibility] = useState(undefined)

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
            dispatch(loginPost({
                email: email,
                password: password
            }))
        }
    }

    useEffect(() => {
        if (loggedUser.ud != undefined) {
            if (emailState && loggedUser.ud != null) {
                dispatch(changeUserId(loggedUser.ud))
                navigate({
                    pathname: "/dashboard",
                    search: "?id=" + loggedUser.ud
                })
            }
            else if (loggedUser.ud == null) {
                setEmailState("notfound")
            }
        }

    }, [loggedUser])

    const createUser = () => {
        dispatch(signupPost({
            "firstName": firstName,
            "lastName": lastName,
            "username": username,
            "email": email,
            "phone": phone,
            "language": "en",
            "password": password,
            "viewmode": viewmode,
            "userVisibility": userVisibility,
            "roles": ["user"]
        }))
    }

    // useEffect(() => {
    //     //|| foundUser.length == 0

    // }, [fo])
    //console.log(signupUser.viewingmode)

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
                        <input placeholder="Email address" type="email" onChange={(e) => setEmail(e.target.value)}></input>
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                        {
                            authType ?
                                <span className="sign-up-container">
                                    <input type="text" placeholder="First name" onChange={(e) => setFirstName(e.target.value)}></input>
                                    <input type="text" placeholder="Last name" onChange={(e) => setLastName(e.target.value)}></input>
                                    <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}></input>
                                    <input type="text" placeholder="phone" onChange={(e) => setPhone(e.target.value)}></input>
                                    <select onChange={e => {
                                        if (e.target.value == "true") {
                                            setViewmode(true)
                                        }
                                        else if (e.target.value == "false") {
                                            setViewmode(false)
                                        }
                                    }}>
                                        <option>Viewing mode</option>
                                        <option value={"false"}>Darkmode</option>
                                        <option value={"true"}>Lightmode</option>
                                    </select>
                                    <select onChange={e => {
                                        if (e.target.value == "true") {
                                            setUserVisibility(true)
                                        }
                                        else if (e.target.value == "false") {
                                            setUserVisibility(false)
                                        }
                                    }

                                    }>
                                        <option>Selection visibility</option>
                                        <option value={"false"}>Anonymous</option>
                                        <option value={"true"}>Visible</option>
                                    </select>

                                </span> :
                                <span></span>
                        }
                        <button onClick={(e) => {
                            e.preventDefault();
                            if (!authType) {
                                searchUser()
                            }
                            else if (authType) {
                                createUser();
                            }

                        }}>{buttonText}</button>

                    </form>
                </section>
            </div>
        </>

    )
}

export default Authetication;