import Navbar from "../components/Navbar";
import Authetication from "../components/Authentication";



function Login() {
    
    const authTitle = " Login to your account"
    const authType = false
    const passwordHeader = "Enter your password:"
    const buttonText = "Sign in"
<<<<<<< HEAD
    const navItems = ["Features", "Login", "How it Works"]
=======
    const navItems = ["Sign-up","About"]
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
    

    return (
        <>
          <Navbar navItems={navItems}/>
          <Authetication authType={authType} authTitle={authTitle} passwordHeader={passwordHeader} buttonText={buttonText}/>
        </>)
}
export default Login;