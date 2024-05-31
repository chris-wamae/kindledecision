import Navbar from "../components/Navbar";
import HowItWorks from "./HowItWorkspage"
import "../styles/Featurespage.css"

function Featurespage() {
    const navItems = ["Login"]
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