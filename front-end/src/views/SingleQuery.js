import { useDispatch, useSelector } from "react-redux";
import { queryState } from "../features/querySlice";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { setQueryState } from "../features/querySlice";
import { setChoicesState } from "../features/choiceSlice";
import { choicesState } from "../features/choiceSlice";
import { queryUsersState, setQueryUsers } from "../features/userQueriesSlice";
import "../styles/SingleQuery.css"
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { refreshAuth, loggedStatus } from "../Helper/Auth";
import { getChoices } from "../features/choiceSlice";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { queryParticipantsState } from "../features/userQueriesSlice";
import { getQueryParticipants } from "../features/userQueriesSlice";
import { getQuery } from "../features/querySlice";
import Cookies from "js-cookie";
import DeleteQuery from "../components/DeleteQuery";
import { queryChangeStatus } from "../features/querySlice";

function SingleQuery() {
    const dispatch = useDispatch();
    const location = useLocation();
    const query = useSelector(queryState);
    const choices = useSelector(choicesState);
    const queryUsers = useSelector(queryUsersState);
    const participants = useSelector(queryParticipantsState)
    const [particationStatus, setParticipationStatus] = useState(null)
    const [queryComplete, setQueryComplete] = useState(null)
    const [queryWinner, setQueryWinner] = useState("")
    const [selections, setSelections] = useState([])
    const navigate = useNavigate();
    const [queryCreator, setQueryCreator] = useState(undefined)
    const [searchParams, setSeachParams] = useSearchParams()
    const queryHasChanged = useSelector(queryChangeStatus)

    //console.log(queryWinner)
    //console.log(choices)
    //console.log(participants)
    //console.log(queryComplete)

    useEffect(() => {
        if (!loggedStatus()) {
            navigate("/")
        }
        else if (refreshAuth() === false) {
            navigate("/login")

        }
        else {
            axios.get(`${process.env.REACT_APP_BASE_URL}query/user-has-voted/${Cookies.get("ud")}/${searchParams.get("qId")}`, { headers: { Authorization: `Bearer ${Cookies.get("at")}` } }).then(r => setParticipationStatus(r.data.result))
            axios.get(`${process.env.REACT_APP_BASE_URL}query/query-selection-complete/${searchParams.get("qId")}`, { headers: { Authorization: `Bearer ${Cookies.get("at")}` } }).then(r => {
                setQueryComplete(r.data)
            })
            axios.get(`${process.env.REACT_APP_BASE_URL}query/get-query-creator/${searchParams.get("qId")}`, { headers: { Authorization: `Bearer ${Cookies.get("at")}` } }).then(r => setQueryCreator(r.data))
        }

    },[])

    useEffect(() => {
        if (queryComplete) {
            axios.get(`${process.env.REACT_APP_BASE_URL}query/choice/get-query-choices/${searchParams.get("qId")}`, { headers: { Authorization: `Bearer ${Cookies.get("at")}` } }).then(r => setSelections(r.data))
        }
    }, [queryComplete])

    useEffect(() => {
        if (selections.length > 0) {
            setQueryWinner(selections[0].title)
        }
    }, [selections])

    useEffect(() => {
        if (loggedStatus() && query.title == "") {
            dispatch(getQuery(searchParams.get("qId")))


            dispatch(getQueryParticipants(searchParams.get("qId")))

            dispatch(getChoices(searchParams.get("qId")))
        }

        //     if (query.id == undefined) {
        //         // axios.get(`${process.env.REACT_APP_BASE_URL}queries${location.search}`)
        //         //     .then(r => dispatch(setQueryState(r.data[0])))
        //     dispatch(setQueryState({
        //         "id": "198a",
        //         "title": "When will it rain?",
        //         "creationTime": "Thu Mar 07 2024 at 11:17:01 AM",
        //         "startDate": "2024-03-18",
        //         "expiryDate": "2024-03-21",
        //         "totalSelectors": 14,
        //         "remainingSelectors": 10,
        //         "creatorUserId": "0"
        //       }))
        //     }
        // }, [])

        // useEffect(() => {
        //     if (choices.length == 0) {
        //         // axios.get(`${process.env.REACT_APP_BASE_URL}Choices?queryId=${query.id}`)
        //         //     .then(r => dispatch(setChoicesState(r.data)))

        //         dispatch(setChoicesState([
        //             {
        //               "id": "e2dc",
        //               "title": "adedaddae",
        //               "queryId": "a664"
        //             },
        //             {
        //               "id": "6877",
        //               "title": "dadada",
        //               "queryId": "7980"
        //             },
        //             {
        //               "id": "a5e3",
        //               "title": "dadada",
        //               "queryId": "7980"
        //             },
        //             {
        //               "id": "279b",
        //               "title": "dadada",
        //               "queryId": "7980"
        //             },
        //             {
        //               "id": "10dc",
        //               "title": "Prague",
        //               "queryId": "936e"
        //             },
        //             {
        //               "id": "24fd",
        //               "title": "Prague",
        //               "queryId": "936e"
        //             }]))

        //         dispatch(setQueryUsers([{
        //             id: 0,
        //             email: "wamae@gmail.com",
        //             status: true
        //         },
        //         {
        //             id: 1,
        //             email: "joker@gmail.com",
        //             status: true
        //         },
        //         {
        //             id: 2,
        //             email: "killua@gmail.com",
        //             status: false
        //         }
        //         ]))
        //     }


    }, [query])

    return (
        <>  <Navbar navItems={["Dashboard"]} />
            <div className="single-query-page">
                <section className="query-details-container white-background">
                    <div className="main-title">Query details</div>
                    <div className="inner-qdc">
                        <p>Title: {query.title}</p>
                        <p>Start date: {query.startDate ? query.startDate.substring(0, 10) : ""}</p>
                        <p>Expiry date: {query.startDate ? query.expiryDate.substring(0, 10) : ""}</p>
                        <p>Total participants: {query.totalSelections}</p>
                        <p>Remaining participants: {query.remainingSelections}</p>
                        <p>Creator:{queryCreator ? queryCreator.email : ""}</p>
                    </div>
                    {
                        particationStatus ? <span></span> : <button onClick={() => {
                            navigate({
                                pathname: "/selection",
                                search: `?qId=${query.id}`
                            })
                        }}>Participate</button>

                    }

                </section>
                {
                    queryComplete ?
                        <section className="results-container">
                            <div className="rs-title">Results</div>
                            <div className="results-info-container">
                                <div className="winner-container">
                                    <div>Winner</div>
                                    <span>{queryWinner}</span>
                                </div>
                                <div className="selection-info-container">
                                    <div className="sic-header">Selections distribution</div>
                                    <div>
                                        <div className="sic-titles">
                                            <div>Choice</div>
                                            <div>Selections</div>
                                        </div>

                                        <div>
                                            {selections.map(s => {
                                                return <div className="single-result-choice">
                                                    <div>{s.title}</div>
                                                    <div>{s.selectionCount}</div>
                                                </div>
                                            })}
                                        </div>
                                        {/*choices and the number of votes they got here*/}
                                    </div>
                                    <div>
                                        { }
                                    </div>
                                </div>
                            </div>



                        </section>
                        :
                        <span></span>
                }

                <section className="secondary-details">
                    <div className="participants-container white-background">
                        <div className="main-title">Participants</div>
                        <div className="inner-pc">
                            <div className="participants-headers sub-heading">
                                <div>Email</div>
                                <div>Status</div>
                            </div>
                            <div className="participants">
                                {
                                    participants.map((u, i) => {
                                        return <div className="single-participant">
                                            <div className="single-participant-email">
                                                <div>{i + 1}.&#160;</div>
                                                <div>{u.email}</div>
                                            </div>

                                            <div>{u.status ? "completed" : "pending"}</div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>




                    </div>
                    <div className="choices-container white-background">
                        <div className="main-title">Choices</div>
                        <div className="choices">
                            {choices.map((c, i) => {
                                return <div className="one-choice">{i + 1}.&#160;{c.title}</div>
                            })}
                        </div>
                    </div>

                </section>
                {
                    (queryCreator && queryCreator.id == Cookies.get("ud")) ?
                        <DeleteQuery queryId={searchParams.get("qId")} />
                        :
                        <span></span>
                }

            </div>


        </>
    )
}

export default SingleQuery;