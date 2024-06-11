import Navbar from "../components/Navbar"
import "../styles/Landingpage.css"
import {Link, Navigate} from "react-router-dom"

function Landingpage() {
    const navItems = ["Login","Sign-up","About"]
    return (
        <>
            <Navbar navItems={navItems} />
            <div className="main">

                <div className="info">

                    <div className="info-text">

                        <div className="main-header">
                            <h1>
                                The easiest way to make group decisions.
                            </h1>
                        </div>

                        <div className="sub-header">
                            Kindledecision makes deciding on anything increadibly simple while maintaining credibility and fairness.
                        </div>

                    </div>

                    <div className="info-img-buttons">
                        <div className="graphic-placeholder"></div>
                        <div className="buttons">
                            <Link to="sign-up">
                            <button id="sign-up-button">Sign Up</button>
                            </Link> 
                            <Link to="login">
                            <button id="login-button">Login</button>
                            </Link>
                        </div>
                    </div>

                   

                </div>



            </div>

            <Link to="about"><div className="hiw-button">How it works?</div></Link>

        </>
    )
}

export default Landingpage;