import Navbar from "../components/Navbar"
import "../styles/Landingpage.css"
import { Link, Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { useState, useEffect } from "react"

function Landingpage() {
    const navItems = ["Login", "Sign-up", "About"]
    const [loggedIn, setLoggedIn] = useState(false)

    const signUserOut = () => {
        Cookies.remove("ud")
        Cookies.remove("at")
        Cookies.remove("et")
        Cookies.remove("rt")
        setLoggedIn(false)
    }

    useEffect(() => {
        if (Cookies.get("ud") !== undefined) {
            setLoggedIn(true)
        }
    }, [loggedIn])

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
                            {
                                loggedIn ?
                                    <button id="sign-up-button" onClick={() => {
                                        signUserOut();
                                    }}>Sign out</button>
                                    :
                                    <Link to="sign-up">
                                        <button id="sign-up-button">Sign Up</button>
                                    </Link>
                            }

                            {
                                loggedIn ? <Link to="dashboard">
                                    <button id="login-button">Dashboard</button>
                                </Link> :
                                    <Link to="login">
                                        <button id="login-button">Login</button>
                                    </Link>
                            }

                        </div>
                    </div>



                </div>



            </div>

            <Link to="about"><div className="hiw-button">How it works?</div></Link>

        </>
    )
}

export default Landingpage;