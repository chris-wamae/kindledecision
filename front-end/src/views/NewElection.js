import "../styles/NewElection.css"
import { useRef } from "react"

function NewElection() {

    const buttonRef = useRef(null);
    const dummyTitle = "How many days to master something?"
    const dummyLink = "https://castavote.com/jc357cfh"

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
            <div className="info-container">
                <div className="header">
                    Congratulations!
                </div>
                <div className="election-name-statement">
                    Your election <span className="election-title">{dummyTitle}</span> has been created!
                </div>
                <div className="support-statement">
                    We've sent emails to everyone on your voter list asking them to participate.
                </div>
                <div className="link-statement">
                    You can also send them this link which will allow them to vote:
                    <a href={dummyLink} className="link">{dummyLink}</a>
                </div>
                <button className="copy-link-button" ref={buttonRef} onClick={e => {
                    navigator.clipboard.writeText(dummyLink)
                    editButtonText()
                    setTimeout(editButtonText, 1000)
                }
                }>Copy</button>
            </div>
        </>
    )
}

export default NewElection;