import "../styles/Authentication.css"

function Authetication({authType, authTitle, passwordHeader, buttonText}) {
    //authType = Sign up when true and Login when false 
    return (
        <>  
            <div className="auth-page">
            <section className="form-change">
                <button className="form-change-active">Sign up</button>
                <button className="form-change-inactive">Login</button>
            </section>
            <section>
                <div className="auth-title">{authTitle}</div>
                <form>
                    <div>Your email address:</div>
                    <input placeholder="email address" type="email"></input>
                    <div>{passwordHeader}</div>
                    <input type="password" placeholder="password"></input>
                    <button>{buttonText}</button>
                </form>
            </section>
            </div>
        </>

    )
}

export default Authetication;