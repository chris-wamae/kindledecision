import Navbar from "../components/Navbar";
import "../styles/AccountManagement.css"
import "../styles/DashboardAccount.css"
import { useState } from "react";
import axios from "axios";

function AccountManagement() {
    const navItems = [""]
    const dummyEmail = "dummy-email@mail.com"
    const dummyPassword = "dummy-password"
    const [showPassword, setShowPassword] = useState(false)

    return (
        <>
            <div className="acc-page-container">
                <div className="page-title">Account Management</div>
                <div className="email-container">
                    <div className="email-header">Email</div>
                    <div className="email">{dummyEmail}</div>
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
                                <div className="password">{dummyPassword}</div>
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