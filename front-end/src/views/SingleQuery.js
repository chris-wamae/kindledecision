import { useDispatch, useSelector } from "react-redux";
import { queryState } from "../features/querySlice";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { setQueryState } from "../features/querySlice";
import { setChoicesState } from "../features/choiceSlice";
import { choicesState } from "../features/choiceSlice";
import { queryUsersState, setQueryUsers } from "../features/userQueriesSlice";
import axios from "axios";


function SingleQuery() {
    const dispatch = useDispatch();
    const location = useLocation();
    const query = useSelector(queryState);
    const choices = useSelector(choicesState);
    const queryUsers = useSelector(queryUsersState);

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
            dispatch(setQueryUsers([{
                id: 0,
                email: "wamae@gmail.com"
            },
            {
                id: 1,
                email: "joker@gmail.com"
            },
            {
                id: 2,
                email: "killua@gmail.com"
            }
            ]))
        }


    }, [query])

    return (
        <>
            <h1>Hello World + {query.id}</h1>
        </>
    )
}

export default SingleQuery;