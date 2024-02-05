import Navbar from "../components/Navbar"
import "../styles/Landingpage.css"
import {Link} from "react-router-dom"

function Landingpage() {
    const navItems = ["Features", "Login", "How it Works"]
    return (
        <>
            <Navbar navItems={navItems} />
            <div class="main">

                <div class="info">

                    <div class="info-text">

                        <div class="main-header">
                            <h1>
                                The easiest way to make group decisions.
                            </h1>
                        </div>

                        <div class="sub-header">
                            Casta Vote makes voting on anything increadibly simple while maintaining credibility and fairness.
                        </div>

                    </div>

                    <div class="info-img-buttons">
                        <div className="graphic-placeholder"></div>
                        <div class="buttons">
                            <Link exact to="sign-up">
                            <button id="sign-up-button">Sign Up</button>
                            </Link> 
                            <Link exact to="login">
                            <button id="login-button">Login</button>
                            </Link>
                        </div>
                    </div>

                </div>



            </div>
        </>
    )
}

export default Landingpage;