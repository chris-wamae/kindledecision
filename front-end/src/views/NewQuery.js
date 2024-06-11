import "../styles/NewQuery.css"
import { useRef } from "react"
import { queryState } from "../features/querySlice";
import {useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { refreshAuth } from "../Helper/Auth";
import { useDispatch } from "react-redux";
import { getQuery } from "../features/querySlice";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

function NewQuery() {

    const dispatch = useDispatch();
    const [searchParams,setSeachParams] = useSearchParams()

    useEffect(() =>{
        if(refreshAuth() === false){navigate("/login")};
        if(query.title == "")
        {
        dispatch(getQuery(searchParams.get("qId")));
        }
        },[])
    

    //check for election voters in state
    //if present send them emails
    //if absent check for election in state
    //if present search for its users and send them email
    //if absent redirect user to their dashboard
    const navItems = ["Dashboard"]
    const query = useSelector(queryState)
    const buttonRef = useRef(null);
    const dummyTitle = "How many days to master something?"
    const dummyLink = "https://castavote.com/jc357cfh"
    const navigate = useNavigate()

    const editButtonText = () => {
        if (buttonRef.current.textContent == "Copy") {
            buttonRef.current.textContent = "Copied!"
        }
        else {
            buttonRef.current.textContent = "Copy"
        }
    }


    return (
        <>  
            <Navbar navItems={navItems}/>  

            <div className="info-container">
                <div className="header">
                    Congratulations!
                </div>
                <div className="query-name-statement">
                    Your query<span className="query-title">{query.title}</span> ,has been created!
                </div>
                {/* <div className="support-statement">
                    Kindledecision can automatically send emails to all participants informing them that the query has been created and asking them to participate.
                </div> */}
                {/* <button className="mail-button">Send emails</button>
                <div className="link-statement">
                    You can also send them this link which will allow them to participate:
                    <a href={dummyLink} className="link">{dummyLink}</a>
                </div> */}
                {/* <button className="copy-link-button" ref={buttonRef} onClick={e => {
                    navigator.clipboard.writeText(dummyLink)
                    editButtonText()
                    setTimeout(editButtonText, 1000)
                }
                }>Copy</button> */}
                <div className="dashboard-button-container">
                <button className="dashboard-btn" onClick={() => navigate("/dashboard")}>Go to dashboard</button>
                <button className="dashboard-btn" onClick={() => {
                navigate(
                {
                pathname: "/query",
                search:`?qId=${query.id}`
                })
                }}>Go to Query</button>
                </div>
            </div>
        </>
    )
}

export default NewQuery;