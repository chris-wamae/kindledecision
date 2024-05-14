import "../styles/Authentication.css"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import ToolTip from "./ToolTip"
import axios from "axios";
import { validateEmail } from "../Helper/Form";
import { useEffect } from "react";
import { authToolTipRenderer } from "../Helper/Form";
import { changeUserId } from "../features/idSlice";
import { useSelector } from "react-redux";
import { loginPost, loginState, loginStatus } from "../features/loginSlice";
import { signUpState, signupPost, signUpStatus } from "../features/signupSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { timeAfterMinutes } from "../Helper/Time";
//make email database search depend on physical button press by user
//move email validation to form Helper since it will no longer be using fetch


function Authetication({ authType, authTitle, passwordHeader, buttonText }) {
    //authType = Sign up when true and Login when false
    const dispatch = useDispatch()
    const loggedUser = useSelector(loginState);
    const loggedUserStatus = useSelector(loginStatus)
    const signupStatus = useSelector(signUpStatus)
    const signupState = useSelector(signUpState);
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailState, setEmailState] = useState(undefined)
    // const [username, setUsername] = useState("")
    //const [phone, setPhone] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
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

    // console.log(loggedUser);
    // console.log(userVisibility);


    const signUpValidator = () => {
        if (emailState && password !== "" && passwordConfirm !== "" && firstName !== "" && lastName !== "" && userVisibility !== undefined && passwordValidator(password)) {
            return true
        }
        else {
            return false
        }
    }

    const passwordValidator = (password) => {
    if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[^\w\d\s]).{8,}$/.test(password))
    {
    return true
    }
    else
    {   
    //console.log(password)
    return false
    }
    }

    //console.log(password)
    // console.log({
    //     "firstName": firstName,
    //     "lastName": lastName,
    //     "email": email,
    //     "language": "en",
    //     "password": password,
    //     "viewmode": true,
    //     "userVisibility": userVisibility,
    //     "phone": "",
    //     "username": "",
    //     "roles": ["user"]
    // })

    const searchUser = () => {
        if (emailState === true) {
            dispatch(loginPost({
                email: email,
                password: password
            }))
        }
    }

    console.log(loggedUser);

    useEffect(() => {
        if (loggedUser != undefined) {
            if (emailState && loggedUser.ud != null) {
                let refreshExpiryTime = new Date()
                dispatch(changeUserId(loggedUser.ud))
                Cookies.set("ud", loggedUser.ud ,{expires:timeAfterMinutes(15)})
                Cookies.set("at", loggedUser.accessToken, {expires:timeAfterMinutes(15)})
                //convert loggedUser.refreshExpiryTime to the time required by expires;
                Cookies.set("rt", loggedUser.refreshToken,{expires:refreshExpiryTime});
               // navigate({
               //     pathname: "/dashboard",
              //      search: "?id=" + loggedUser.ud + "&t=" + loggedUser.token
              //  })
            }
            else if (loggedUserStatus == "failed") {
                setEmailState("notfound")
            }
        }

    }, [loggedUser])

    const createUser = () => {
        dispatch(signupPost({
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "language": "en",
            "password": password,
            "viewmode": true,
            "userVisibility": userVisibility,
            "phone": "",
            "username": "",
            "roles": ["user"]
        }))
    }

    useEffect(() => {
    if(signupStatus == "failed")
    {
    setEmailState("error")
    }
    else if(signupStatus == "successful")
    {
     navigate("/login")
    }
    },[signupState])

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
                        {authToolTipRenderer(emailState)}
                        <input placeholder="Email address" type="email" onChange={(e) => setEmail(e.target.value)}></input>
                        {(!passwordValidator(password) && password !== "" && authType) ? <ToolTip type={"error"} message={"Invalid password"}/> : <span></span>}
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                        {
                            authType ?
                                <span className="sign-up-container">
                                    {(password !== passwordConfirm) ? <ToolTip type={"error"} message={"Passwords do not match"} /> : <span></span>}
                                    <input type="password" placeholder="Password confirmation" onChange={(e) => setPasswordConfirm(e.target.value)}></input>
                                    <input type="text" placeholder="First name" onChange={(e) => setFirstName(e.target.value)}></input>
                                    <input type="text" placeholder="Last name" onChange={(e) => setLastName(e.target.value)}></input>
                                    {/* <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}></input>
                                    <input type="text" placeholder="phone" onChange={(e) => setPhone(e.target.value)}></input> */}
                                    {/* <select onChange={e => {
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
                                    </select> */}
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

                                    <button disabled={signUpValidator() ? false : true} className={signUpValidator() ? "" : "disabled-button"} onClick={(e) => {
                                        e.preventDefault();
                                        createUser();
                                    }}>{buttonText}</button>

                                </span>


                                :
                                <button disabled={(emailState && password !== "") ? false : true} className={(emailState && password !== "") ? "" : "disabled-button"} onClick={(e) => {
                                    e.preventDefault();
                                    searchUser();
                                }}>{buttonText}</button>
                        }

                    </form>
                </section>
            </div>
        </>

    )
}

export default Authetication;