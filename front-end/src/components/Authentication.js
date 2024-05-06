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
import { useNavigate } from "react-router-dom";

//make email database search depend on physical button press by user
//move email validation to form Helper since it will no longer be using fetch


function Authetication({ authType, authTitle, passwordHeader, buttonText }) {
    //authType = Sign up when true and Login when false
    const dispatch = useDispatch()
    const loggedUser = useSelector(loginState);
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailState, setEmailState] = useState(undefined)
    const [signupUser,setSignupUser] = useState({
    email:"",
    password:"",
    username:"",
    phone:"",
    //boolean
    viewingmode:undefined,
    //boolean
    uservisibility:undefined
    })

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
                        <p className="input-header" id="password-header"><br></br></p>
                        <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}></input>
                        {
                        authType ? 
                        <div className="sign-up-container">
                        <input type="text" placeholder="username"></input>
                        <input type="text" placeholder="phone"></input>
                        <select>
                            <option>Viewing mode</option>
                            <option value={false}>Darkmode</option>
                            <option value={true}>Lightmode</option>
                        </select>
                        <select>
                            <option>Selection visibility</option>
                            <option value={false}>Anonymous</option>
                            <option value={true}>Visible</option>
                        </select>

                        </div>    :
                        <span></span>
                        }
                        <button onClick={(e) => {
                            e.preventDefault();
                            if(!authType)
                            {
                            searchUser()
                            }
                        }}>{buttonText}</button>

                    </form>
                </section>
            </div>
        </>

    )
}

export default Authetication;