import "../styles/NewQuery.css"
import { useRef } from "react"
import { queryState } from "../features/querySlice";
import {useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function NewQuery() {
     
    //check for election voters in state
    //if present send them emails
    //if absent check for election in state
    //if present search for its users and send them email
    //if absent redirect user to their dashboard
    const navItems = ["Features", "Login", "How it Works"]
    const query = useSelector(queryState)
    const buttonRef = useRef(null);
    const dummyTitle = "How many days to master something?"
    const dummyLink = "https://castavote.com/jc357cfh"
    const navigate = useNavigate()

    console.log(query);

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
                    navigator.clipboard.writeText(dummyLink)
                    editButtonText()
                    setTimeout(editButtonText, 1000)
                }
                }>Copy</button>

                <div>Done?</div>

                <button>Go to dashboard</button>
                <button onClick={() => {
                navigate(
                {
                pathname: "/query",
                search:`?id=${query.id}`
                })
                }}>Go to Query</button>
            </div>
        </>
    )
}

export default NewQuery;