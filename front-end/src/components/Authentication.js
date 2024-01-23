import "../styles/Authentication.css"
import { Link } from "react-router-dom";

function Authetication({authType, authTitle, passwordHeader, buttonText}) {
    //authType = Sign up when true and Login when false
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
                    <input placeholder="email address" type="email"></input>
                    <div className="input-header">{passwordHeader}</div>
                    <input type="password" placeholder="password"></input>
                    <button>{buttonText}</button>
                </form>
            </section>
            </div>
        </>

    )
}

export default Authetication;