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


function SingleQuery() {
    const dispatch = useDispatch();
    const location = useLocation();
    const query = useSelector(queryState);
    const choices = useSelector(choicesState);
    const queryUsers = useSelector(queryUsersState);
    const navigate = useNavigate();

    console.log(query.id)
    console.log(choices)
    console.log(queryUsers)

    useEffect(() => {
        if (query.id == undefined) {
            // axios.get(`${process.env.REACT_APP_BASE_URL}queries${location.search}`)
            //     .then(r => dispatch(setQueryState(r.data[0])))
        dispatch(setQueryState({
            "id": "198a",
            "title": "When will it rain?",
            "creationTime": "Thu Mar 07 2024 at 11:17:01 AM",
            "startDate": "2024-03-18",
            "expiryDate": "2024-03-21",
            "totalSelectors": 14,
            "remainingSelectors": 10,
            "creatorUserId": "0"
          }))
        }
    }, [])

    useEffect(() => {
        if (choices.length == 0) {
            // axios.get(`${process.env.REACT_APP_BASE_URL}Choices?queryId=${query.id}`)
            //     .then(r => dispatch(setChoicesState(r.data)))

            dispatch(setChoicesState([
                {
                  "id": "e2dc",
                  "title": "adedaddae",
                  "queryId": "a664"
                },
                {
                  "id": "6877",
                  "title": "dadada",
                  "queryId": "7980"
                },
                {
                  "id": "a5e3",
                  "title": "dadada",
                  "queryId": "7980"
                },
                {
                  "id": "279b",
                  "title": "dadada",
                  "queryId": "7980"
                },
                {
                  "id": "10dc",
                  "title": "Prague",
                  "queryId": "936e"
                },
                {
                  "id": "24fd",
                  "title": "Prague",
                  "queryId": "936e"
                }]))

            dispatch(setQueryUsers([{
                id: 0,
                email: "wamae@gmail.com",
                status: true
            },
            {
                id: 1,
                email: "joker@gmail.com",
                status: true
            },
            {
                id: 2,
                email: "killua@gmail.com",
                status: false
            }
            ]))
        }


    }, [query])



    return (
        <>  <Navbar navItems={["Dashboard"]}/>
            <div className="single-query-page">
                <section className="query-details-container white-background">
                    <div className="main-title">Query details</div>
                    <div className="inner-qdc">
                        <p>Title: {query.title}</p>
                        <p>Start date: {query.startDate}</p>
                        <p>Expiry date: {query.expiryDate}</p>
                        <p>Total participants: {query.totalSelectors}</p>
                        <p>Remaining participants: {query.remainingSelectors}</p>
                        <p>Creator: creatorUserId:{query.creatorUserId}</p>
                    </div>
                    <button onClick={() => {
                    navigate({
                    pathname:"/selection",
                    search:`?id=${query.id}`
                    })
                    }}>Participate</button>
                </section>
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
                                    queryUsers.map((u,i) => {
                                        return <div className="single-participant">
                                            <div className="single-participant-email">
                                            <div>{i+1}.&#160;</div> 
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
                        {choices.map((c,i) => {
                            return <div className="one-choice">{i+1}.&#160;{c.title}</div>
                        })}
                        </div>
                    </div>
                    
                </section>
            </div>

        </>
    )
}

export default SingleQuery;