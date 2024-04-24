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
  const userId = useSelector(currentUserId)
  const query = useSelector(queryState)



  const canSave = () => {

    if (queryTitle !== "" && expiryDate !== "") {
      return false
    }
    else {
      return true
    }
  }



  const createQuery = (queryTitle) => {

    const creationTime = getTime();

    return {

      title: queryTitle,

      creationTime: creationTime,

      startDate: startDate,

      expiryDate: expiryDate,

      totalSelectors: null,

      remainingSelectors: null,

      creatorUserId: userId
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
              dispatch(postQuery(createQuery(queryTitle)))
              resetForm([titleRef, dateRef])
              //console.log(currentElectionState);
              //dispatch(changeElectionId(currentElectionState["id"]))
              redirect("/add-choices", { replace: true })

            }}>Create</button>

          </form>
        </div>
    </>
  )
}

export default CreateQuery;