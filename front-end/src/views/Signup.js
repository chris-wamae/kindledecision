import Authetication from "../components/Authentication"
import Navbar from "../components/Navbar"
function Signup() {
     const authTitle = "Create an account"
     const authType = true
     const passwordHeader = "Create a password:"
     const buttonText = "Sign up"
     const navItems = ["Login", "About"]

    return (
    <>
    <Navbar navItems={navItems}/>
    <Authetication authTitle={authTitle} authType={authType} passwordHeader={passwordHeader} buttonText={buttonText}/>
    </>
    )
}

export default Signup;