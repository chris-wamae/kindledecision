import Navbar from "../components/Navbar";
import HowItWorks from "./HowItWorkspage"
import "../styles/Featurespage.css"

function Featurespage() {
    const navItems = ["Features", "Login", "How it Works"]
    return (
        <>
            <Navbar navItems={navItems} />
            <section>
                <div>Features</div>
                <div>
                    <div>Anonymous voting</div>
                    <div>Voting automation</div>
                    <div>Email notifications</div>
                </div>
            </section>
            <HowItWorks/>
        </>)
}

export default Featurespage;