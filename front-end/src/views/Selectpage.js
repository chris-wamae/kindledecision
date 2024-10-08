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
import { postSelection } from "../features/selectionSlice";
import { selectionState } from "../features/selectionSlice";
import { useNavigate } from "react-router-dom";
import { refreshAuth, loggedStatus } from "../Helper/Auth";
import { useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";

function Selectpage() {

    const navigate = useNavigate()

    const query = useSelector(queryState)

    const choices = useSelector(choicesState)

    const location = useLocation()

    const selection = useSelector(selectionState)

    const dispatch = useDispatch()

    const [selectionReason, setSelectionReason] = useState("")

    const [choiceId, setChoiceId] = useState(null)

    const [showConfirmation, setShowConfirmation] = useState(false)

    const [choiceTitle, setChoiceTitle] = useState("")

    const [searchParams, setSeachParams] = useSearchParams()

    const [showQueryDescription, setShowQueryDescription] = useState(true)

    const [showChoiceOfThisIdDescription, setShowChoiceOfThisIdDescription] = useState(undefined)

    //placeholderUser(wamae)
    const selectChoice = (choiceId) => {
        dispatch(postSelection({ choiceId: choiceId, userId: parseInt(Cookies.get("ud")), queryId: parseInt(searchParams.get("qId")), reason: selectionReason }))
        axios.post(`${process.env.REACT_APP_BASE_URL}query/remaining-selections/${searchParams.get("qId")}`, { headers: { Authorization: `Bearer ${Cookies.get("at")}` } })
    }


    useEffect(() => {
        if (!loggedStatus()) {
            navigate("/")
        }
        else if (refreshAuth() === false) { navigate("/login") }
        else if (query.title == "") {
            axios.get(`${process.env.REACT_APP_BASE_URL}query/${searchParams.get("qId")}`, { headers: { Authorization: `Bearer ${Cookies.get("at")}` } })
                .then(r => dispatch(setQueryState(r.data)))
        }
    }, [])

    useEffect(() => {
        if (loggedStatus()) {
            axios.get(`${process.env.REACT_APP_BASE_URL}query/choice/get-query-choices/${searchParams.get("qId")}`, { headers: { Authorization: `Bearer ${Cookies.get("at")}` } })
                .then(r => dispatch(setChoicesState(r.data)))
        }

    }, [query])


    const queryDescription = () => {
        if (!showQueryDescription) {
            return <div className="description-toggle" onClick={() => { setShowQueryDescription(true) }}>show description</div>
        }
        else {
            return <div className="query-description">
                {query.description}
                <div className="description-toggle" onClick={() => { setShowQueryDescription(false) }}>hide description</div>
            </div>
        }

    }

    return (
        <>
            <Navbar navItems={["About"]} />
            <div className="page-title">Make your selection below</div>
            <div className="selection-container">
                <div className="selection-title">
                    {query.title}
                    {queryDescription()}

                </div>
                <div className="choices">
                    <div className={showConfirmation ? "confirmation" : "hide-confirmation"}>
                        <div className="options-title">Select <span className="choice-name">{choiceTitle}</span> as your choice?</div>
                        <div className="select-buttons">
                            <div className="yes option-select" onClick={() => {
                                selectChoice(choiceId)
                                navigate("/successful-selection")
                            }
                            }>&#x2714;</div>
                            <div className="no option-select" onClick={() => setShowConfirmation(false)}>X</div>
                        </div>
                        {/* <div>
                            <textarea placeholder="You may a reason for your choice here (this is optional)" onChange={(e) => {
                                setSelectionReason(e.target.value)
                            }}></textarea>
                        </div> */}


                    </div>
                    <div className="inner-choices">
                        {
                            choices.map(c => {
                                //console.log(c)
                                return <div>
                                <div className="single-choice" onClick={() => {
                                    setShowConfirmation(!showConfirmation)
                                    setShowQueryDescription(false)
                                    setChoiceId(c.id)
                                    setChoiceTitle(c.title)
                                }}
                                >{c.title}
                                </div>
                                <div className="choice-description">
                                    {(showChoiceOfThisIdDescription == c.id) ? <div>{c.description}
                                     <div className="choice-description-toggle" onClick={() => {
                                         setShowChoiceOfThisIdDescription(undefined)
                                         setShowConfirmation(false)
                                     }
                                     }>hide description</div>
                                 </div> : ""}
                                </div>
                                {
                                (showChoiceOfThisIdDescription !== c.id && c.description !== "") ? 
                                <div className="choice-description-toggle" onClick={() => {
                                    setShowChoiceOfThisIdDescription(c.id)
                                    setShowConfirmation(false)

                                }}>show {c.title} description</div> : <div></div>
                                }
                                 
                                 </div>
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