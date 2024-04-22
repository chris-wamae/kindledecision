import Navbar from "../components/Navbar";
import Authetication from "../components/Authentication";



function Login() {
    
    const authTitle = " Login to your account"
    const authType = false
    const passwordHeader = "Enter your password:"
    const buttonText = "Sign in"
    const navItems = ["Login", "About"]
    

    return (
        <>
          <Navbar navItems={navItems}/>
          <Authetication authType={authType} authTitle={authTitle} passwordHeader={passwordHeader} buttonText={buttonText}/>
        </>)
}
export default Login;