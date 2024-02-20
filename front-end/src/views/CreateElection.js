import Navbar from "../components/Navbar";
import "../styles/CreateElection.css"
import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postElection } from "../features/electionSlice";
import { useNavigate } from "react-router-dom";
import { resetForm } from "../Helper/Form";
import { getTime } from "../Helper/Time";
import { electionState } from "../features/electionSlice";
import { changeElectionId } from "../features/idSlice";
import { currentUserId } from "../features/idSlice";

function CreateElection() {
  
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const titleRef = useRef(null)
  const dateRef = useRef(null)
  const navItems = ["Features", "Login", "How it Works"]
  const [electionTitle, setElectionTitle] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  //const [currentElectionId, setCurrentElectionId] = useState(undefined);
  const userId = useSelector(currentUserId)
  

  const canSave = () => {

    if (electionTitle !== "" && expiryDate !== "") {
      return false
    }
    else {
      return true
    }
  }

  const createElection = (electionTitle) => {

    const creationTime = getTime();

    return {

      title: electionTitle,

      creationTime: creationTime,

      expiryDate: expiryDate,

      totalVotes: null,

      remainingVotes: null,

      creatorUserId: userId
    }

  }

  return (
    <>
      <Navbar navItems={navItems} />

      <div className="page-header">Create an election</div>

      <div className="election-container">

        <div className="election-form-div">

          <form className="election-form">

            <label htmlFor="election-title" id="title" className="input-title" >Tile:</label>

            <input title="election-title" placeholder="What's the election about?" onChange={(e) => setElectionTitle(e.target.value)} ref={titleRef}></input>

            <label htmlFor="expiry-date" className="date-title">Expiry date:</label>

            <input title="expiry-date" type="date" onChange={(e) => setExpiryDate(e.target.value)} ref={dateRef}></input>

            <button className="submit-button" disabled={canSave()} onClick={(e) => {
              e.preventDefault();
              dispatch(postElection(createElection(electionTitle)))
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

export default CreateElection;