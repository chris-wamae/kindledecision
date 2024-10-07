import Authetication from "../components/Authentication"
import Navbar from "../components/Navbar"
function Signup() {
     const authTitle = "Create an account"
     const authType = true
     const passwordHeader = "Create a password:"
     const buttonText = "Sign up"
<<<<<<< HEAD
     const navItems = ["Features", "Login", "How it Works"]
=======
     const navItems = ["Login", "About"]
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

    return (
    <>
    <Navbar navItems={navItems}/>
    <Authetication authTitle={authTitle} authType={authType} passwordHeader={passwordHeader} buttonText={buttonText}/>
    </>
    )
}

export default Signup;