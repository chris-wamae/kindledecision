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

function CreateQuery() {
  
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const titleRef = useRef(null)
  const dateRef = useRef(null)
  const navItems = ["Features", "Login", "How it Works"]
  const [queryTitle, setQueryTitle] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const userId = useSelector(currentUserId)
  

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

        <div className="query-form-div">

          <form className="query-form">

            <label htmlFor="query-title" id="title" className="input-title" >Tile:</label>

            <input title="query-title" placeholder="What's the query?" onChange={(e) => setQueryTitle(e.target.value)} ref={titleRef}></input>

            <label htmlFor="expiry-date" className="date-title">Expiry date:</label>

            <input title="expiry-date" type="date" onChange={(e) => setExpiryDate(e.target.value)} ref={dateRef}></input>

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
      </div>
    </>
  )
}

export default CreateQuery;