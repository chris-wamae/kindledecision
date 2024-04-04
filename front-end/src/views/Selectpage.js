import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { queryState } from "../features/querySlice";
import { setQueryState } from "../features/querySlice";
import { choicesState, setChoicesState } from "../features/choiceSlice";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "../styles/Selectpage.css"

function Selectpage() {
    const query = useSelector(queryState)

    const choices = useSelector(choicesState)

    const location = useLocation()

    const dispatch = useDispatch()

    const [choiceId, setChoiceId] = useState(null)

    const [showConfirmation, setShowConfirmation] = useState(false)

    const [choiceTitle, setChoiceTitle] = useState("")

    //console.log(choiceId)

    useEffect(() => {
        if (query.id == undefined) {
            axios.get(`${process.env.REACT_APP_BASE_URL}queries${location.search}`)
                .then(r => dispatch(setQueryState(r.data[0])))
        }
    }, [])

    useEffect(() => {
        if (choices.length == 0) {
            axios.get(`${process.env.REACT_APP_BASE_URL}Choices?queryId=${query.id}`)
                .then(r => dispatch(setChoicesState(r.data)))
        }
    }, [query])

    return (
        <>
            <Navbar navItems={["Features", "Login", "How it Works"]} />
            <div className="page-title">Make your selection below</div>
            <div className="selection-container">
                <div className="selection-title">
                    {query.title}
                </div>
                <div className="choices">
                    <div className={showConfirmation ? "confirmation" : "hide-confirmation"}>
                        <div className="options-title">Select <span className="choice-name">{choiceTitle}</span> as your choice?</div>
                        <div className="select-buttons">
                            <div className="yes option-select">&#x2714;</div>
                            <div className="no option-select">X</div>
                        </div>

                    </div>
                    <div className="inner-choices">
                    {
                        choices.map(c => {
                            return <div className="single-choice" onClick={() => {
                                setShowConfirmation(!showConfirmation)
                                setChoiceId(c.id)
                                setChoiceTitle(c.title)
                            }}
                            >{c.title}</div>
                        })
                    }
                    </div>
                    
                    {/* add different choices here */}
                </div>
            </div>
        </>
    )
}

export default Selectpage;