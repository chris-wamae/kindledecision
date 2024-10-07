import Navbar from "../components/Navbar";
import HowItWorks from "./HowItWorkspage"
import "../styles/Featurespage.css"
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
            </section>
        </>)
}

export default Featurespage;