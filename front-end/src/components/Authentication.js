import "../styles/Authentication.css"
import { Link } from "react-router-dom";
import { useDispatch} from "react-redux";
import { useState } from "react";
import ToolTip from "./ToolTip"
import axios from "axios";
import { validateEmail } from "../Helper/Form";
import { useEffect } from "react";


function Authetication({authType, authTitle, passwordHeader, buttonText}) {
    //authType = Sign up when true and Login when false

    const [user,setUser] = useState({})
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validEmail,setValidEmail] = useState(false);
    const [foundEmail,setFoundEmail] = useState()
    
    useEffect(() => {
     if(validateEmail(email))
     {
        setValidEmail(true)
     }
     else{
        setValidEmail(false);
     }
    },[email])
     

    useEffect(()=> {
    if(validEmail)
    {
    
    }
    },[validEmail])
      
    console.log(foundEmail);

    return (
        <>  
            <div className="auth-page">
            <section className="form-change">
                <Link exact to="/sign-up"><button className={authType ? "form-change-active" : "form-change-inactive" }>Sign up</button></Link>
                <Link exact to="/login"><button className={!authType ? "form-change-active" : "form-change-inactive" }>Login</button></Link>
                
                
            </section>
            <section>
                <div className="auth-title">{authTitle}</div>
                <form>
                    <div className="input-header">Your email address:</div>
                    <ToolTip type={"error"} message={"This email does not exist"}/>
                    <input placeholder="email address" type="email" onChange={(e) => setEmail(e.target.value)}></input>
                    <div className="input-header">{passwordHeader}</div>
                    <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}></input>
                    <button>{buttonText}</button>

                </form>
            </section>
            </div>
        </>

    )
}

export default Authetication;