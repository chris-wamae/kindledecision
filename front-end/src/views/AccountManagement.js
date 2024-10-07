import Navbar from "../components/Navbar";
import "../styles/AccountManagement.css"
<<<<<<< HEAD
import { useState } from "react";

function AccountManagement() {
    const navItems = ["Features", "Login", "How it Works"]
    const dummyEmail = "dummy-email@mail.com"
    const dummyPassword = "dummy-password"
=======
import "../styles/DashboardAccount.css"
import { useState } from "react";
import axios from "axios";

function AccountManagement() {
    const navItems = [""]
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
    const [showPassword, setShowPassword] = useState(false)

    return (
        <>
<<<<<<< HEAD
            <Navbar navItems={navItems} />
            <div className="page-container">
                <div className="page-title">Account Management</div>
                <div className="email-container">
                    <div className="email-header">Email</div>
                    <div className="email">{dummyEmail}</div>
=======
            <div className="acc-page-container">
                <div className="page-title">Account Management</div>
                <div className="email-container">
                    <div className="email-header">Email</div>
                    <div className="email">{"cheesy"}</div>
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
                </div>

                <div className="password-container">
                    {
                        !showPassword ? <>
                            <div className="password-header">Password</div>
                            <div className="password">********</div>
                            <button onClick={() => setShowPassword(true)} className="password-button">Show password</button>
                        </>
                            :
                            <>
                                <div className="password-header">Password</div>
<<<<<<< HEAD
                                <div className="password">{dummyPassword}</div>
=======
                                <div className="password">{"******"}</div>
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
                                <div>
                                <button onClick={() => setShowPassword(false)} className="password-button">Hide password</button>
                                <button className="password-button">Change password</button>
                                </div>
                                
                            </>


                    }

                </div>
            </div>

        </>
    )
}

export default AccountManagement;