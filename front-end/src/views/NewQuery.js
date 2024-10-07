import "../styles/NewQuery.css"
import { useRef } from "react"
import { queryState } from "../features/querySlice";
<<<<<<< HEAD
import { UseSelector, useSelector } from "react-redux";
import Navbar from "../components/Navbar";

function NewQuery() {
     
=======
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { refreshAuth } from "../Helper/Auth";
import { useDispatch } from "react-redux";
import { getQuery } from "../features/querySlice";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { loggedStatus } from "../Helper/Auth";
import { queryChangeStatus, setQueryChange } from "../features/querySlice";
// import { useSelector } from "react-redux";

function NewQuery() {

    const dispatch = useDispatch();

    const queryChanged = useSelector(queryChangeStatus)

    const [searchParams, setSeachParams] = useSearchParams()
    

    useEffect(() => {

    }, [])

    useEffect(() => {
        if (!loggedStatus()) {
            navigate("/")
        }
        else if (refreshAuth() === false) { navigate("/login") }

        else if (query.title == "") {
            dispatch(getQuery(searchParams.get("qId")));
        }
    }, [])


>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
    //check for election voters in state
    //if present send them emails
    //if absent check for election in state
    //if present search for its users and send them email
    //if absent redirect user to their dashboard
<<<<<<< HEAD
    const navItems = ["Features", "Login", "How it Works"]
=======
    const navItems = ["Dashboard"]
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
    const query = useSelector(queryState)
    const buttonRef = useRef(null);
    const dummyTitle = "How many days to master something?"
    const dummyLink = "https://castavote.com/jc357cfh"
<<<<<<< HEAD

    console.log(query);
=======
    const navigate = useNavigate()
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

    const editButtonText = () => {
        if (buttonRef.current.textContent == "Copy") {
            buttonRef.current.textContent = "Copied!"
        }
        else {
            buttonRef.current.textContent = "Copy"
        }
    }


    return (
<<<<<<< HEAD
        <>  
            <Navbar navItems={navItems}/>  
=======
        <>
            <Navbar navItems={navItems} />
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

            <div className="info-container">
                <div className="header">
                    Congratulations!
                </div>
                <div className="query-name-statement">
<<<<<<< HEAD
                    Your query <span className="query-title">{query.title}</span> has been created!
                </div>
                <div className="support-statement">
                    Kindledecision can automatically send emails to all participants informing them that the query has been created and asking them to participate.
                </div>
                <button className="mailButton">Send emails</button>
                <div className="link-statement">
                    You can also send them this link which will allow them to participate:
                    <a href={dummyLink} className="link">{dummyLink}</a>
                </div>
                <button className="copy-link-button" ref={buttonRef} onClick={e => {
=======
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
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
                    navigator.clipboard.writeText(dummyLink)
                    editButtonText()
                    setTimeout(editButtonText, 1000)
                }
<<<<<<< HEAD
                }>Copy</button>

                <div>Done?</div>

                <button>Go to dashboard</button>
                <button>Go to Query</button>
=======
                }>Copy</button> */}
                <div className="dashboard-button-container">
                    <button className="dashboard-btn" onClick={() => 
                  { dispatch(setQueryChange(true))
                    navigate("/dashboard")}}>Go to dashboard</button>
                    <button className="dashboard-btn" onClick={() => {
                        dispatch(setQueryChange(true))
                        navigate(
                            {
                                pathname: "/query",
                                search: `?qId=${query.id}`
                            })
                    }}>Go to Query</button>
                </div>
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
            </div>
        </>
    )
}

export default NewQuery;