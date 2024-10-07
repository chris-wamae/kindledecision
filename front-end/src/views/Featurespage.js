import Navbar from "../components/Navbar";
import HowItWorks from "./HowItWorkspage"
import "../styles/Featurespage.css"
<<<<<<< HEAD

function Featurespage() {
    const navItems = ["Features", "Login", "How it Works"]
    return (
        <>
            <Navbar navItems={navItems} />
            <section>
=======
import { loggedStatus } from "../Helper/Auth";
import { useEffect, useState } from "react";

function Featurespage() {
    const [navItems,setNavItems] = useState(["Login", "Sign-up"])
    useEffect(() => {
    if(!loggedStatus())
    {
    setNavItems(["Login", "Sign-up"])
    }
    else
    {
    setNavItems(["Dashboard"])
    }
    },[])
    return (
        <>
            <Navbar navItems={navItems} />
            <section className="about-page">
            <section className="features-container">
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
                <div className="features-title">Features</div>
                <div>
                    <div className="single-feature">
                        <img src="download.png"></img>
                        <div>Anonymous participation</div>
                    </div>
                    <div className="single-feature">
                        <img src="download.png"></img>
                        <div>Automation</div>
                    </div>
                    <div className="single-feature">
                        <img src="download.png"></img>
                        <div>Email notifications</div>
                    </div>
                    
                    
                    
                </div>
            </section>
            <HowItWorks />
<<<<<<< HEAD
=======
            </section>
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
        </>)
}

export default Featurespage;