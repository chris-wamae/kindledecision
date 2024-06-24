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
    
    const [selectionReason,setSelectionReason] = useState("")

    const [choiceId, setChoiceId] = useState(null)

    const [showConfirmation, setShowConfirmation] = useState(false)

    const [choiceTitle, setChoiceTitle] = useState("")

    const [searchParams, setSeachParams] = useSearchParams()

    //placeholderUser(wamae)
    const selectChoice = (choiceId) => {
        dispatch(postSelection({ choiceId: choiceId, userId: parseInt(Cookies.get("ud")), queryId: parseInt(searchParams.get("qId")), reason:selectionReason }))
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

    return (
        <>
            <Navbar navItems={["About"]} />
            <div className="page-title">Make your selection below</div>
            <div className="selection-container">
                <div className="selection-title">
                    {query.title}
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
                        <div>
                        <textarea placeholder="You may a reason for your choice here (this is optional)" onChange={(e) => {
                        setSelectionReason(e.target.value)
                        }}></textarea>
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