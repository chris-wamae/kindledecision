import Navbar from "../components/Navbar"

function Landingpage(){
    const navItems = ["Features", "Login", "How it Works"]
    return (
     <>
     <Navbar navItems={navItems}/>
     </>
    )
}

export default Landingpage;