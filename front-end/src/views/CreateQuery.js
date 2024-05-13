import Navbar from "../components/Navbar";
import "../styles/CreateQuery.css"
import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postQuery } from "../features/querySlice";
import { useNavigate } from "react-router-dom";
import { resetForm } from "../Helper/Form";
import { getTime } from "../Helper/Time";
import { queryState } from "../features/querySlice";
import { changeQueryId } from "../features/idSlice";
import { currentUserId } from "../features/idSlice";
import { loginState } from "../features/loginSlice";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { timeAfterMinutes } from "../Helper/Time";

function CreateQuery() {

  const redirect = useNavigate();
  const dispatch = useDispatch();
  const titleRef = useRef(null)
  const dateRef = useRef(null)
  const navItems = [""]
  const [queryTitle, setQueryTitle] = useState("")
  const [startDate, setStartDate] = useState(null)
  const [expiryDate, setExpiryDate] = useState("")
  const [showStartDateInput, setShowStartDateInput] = useState("display-none start-date-input")
  const loggedUser = useSelector(loginState)
  const query = useSelector(queryState)



  const canSave = () => {

    if (queryTitle !== "" && expiryDate !== "") {
      return false
    }
    else {
      return true
    }
  }
  //console.log(loggedUser.token)
  const config = {headers: {Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGVzdGVyQHRlc3Rlci5jb20iLCJleHAiOjE3MTU2MTIyMzQsImlzcyI6IktpbmRsZURlY2lzaW9uIn0.GlEhRZDxGZCnCLA9fKF_6LcnS_vBYPwQFrYnFes_XwA`}}
  console.log(config)
  const createQuery = (queryTitle) => {

    const creationTime = getTime();

    return {

      title: queryTitle,

      creationTime: creationTime,

      startDate: startDate,

      expiryDate: expiryDate,

      totalSelectors: null,

      remainingSelectors: null,

      //creatorUserId: loggedUser.ud
    }

  }

  return (
    <>
      <Navbar navItems={navItems} />

      <div className="page-header">Create a query</div>

      <div className="query-container">

          <form className="query-form">

            <label htmlFor="query-title" id="title" className="input-title" >Tile:</label>

            <input title="query-title" placeholder="What's the query?" onChange={(e) => setQueryTitle(e.target.value)} ref={titleRef}></input>

            <label htmlFor="start-date">Start date:</label>
            <select onChange={(e) => {
              setShowStartDateInput(e.target.value)
              if (e.target.value == "display-none start-date-input") {
                setStartDate(null)
              }
            }}>
              <option value="display-none start-date-input">Immediately</option>
              <option value="start-date-input">Specific date</option>
            </select>
            <input type="date"  onChange={e => setStartDate(e.target.value)} className={showStartDateInput}></input>

            <label htmlFor="expiry-date" className="date-title">Expiry date:</label>

            <input title="expiry-date" placeholder="Select date" type="date" onChange={(e) => setExpiryDate(e.target.value)} ref={dateRef}></input>

            <button className="submit-button" disabled={canSave()} onClick={(e) => {
              e.preventDefault();
              dispatch(postQuery(createQuery(queryTitle),config))
              resetForm([titleRef, dateRef])
              //console.log(currentElectionState);
              //dispatch(changeElectionId(currentElectionState["id"]))
            //  redirect("/add-choices", { replace: true })

            }}>Create</button>

          </form>
        </div>
    </>
  )
}

export default CreateQuery;