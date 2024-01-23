import Navbar from "../components/Navbar";
import HowItWorks from "./HowItWorkspage"
import "../styles/Featurespage.css"

function Featurespage() {
    const navItems = ["Features", "Login", "How it Works"]
    return (
        <>
            <Navbar navItems={navItems} />
            <section>
                <div className="features-title">Features</div>
                <div>
                    <div className="single-feature">
                        <img src="download.png"></img>
                        <div>Anonymous voting</div>
                    </div>
                    <div className="single-feature">
                        <img src="download.png"></img>
                        <div>Voting automation</div>
                    </div>
                    <div className="single-feature">
                        <img src="download.png"></img>
                        <div>Email notifications</div>
                    </div>
                    
                    
                    
                </div>
            </section>
            <HowItWorks />
        </>)
}

export default Featurespage;