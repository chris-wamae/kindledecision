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
<<<<<<< HEAD
import { changeQueryId } from "../features/idSlice";
import { currentUserId } from "../features/idSlice";
import { useEffect } from "react";

function CreateQuery() {

  const redirect = useNavigate();
  const dispatch = useDispatch();
  const titleRef = useRef(null)
  const dateRef = useRef(null)
  const navItems = ["Features", "Login", "How it Works"]
  const [queryTitle, setQueryTitle] = useState("")
  const [startDate, setStartDate] = useState(null)
  const [expiryDate, setExpiryDate] = useState("")
  const [showStartDateInput, setShowStartDateInput] = useState("display-none start-date-input")
  const userId = useSelector(currentUserId)
=======
import { loginState } from "../features/loginSlice";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { timeAfterMinutes } from "../Helper/Time";
import { refreshAuth, loggedStatus } from "../Helper/Auth";
import { getCurrentISOTime } from "../Helper/Time";

function CreateQuery() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const titleRef = useRef(null)
  const dateRef = useRef(null)
  const navItems = [""]
  const [queryTitle, setQueryTitle] = useState("")
  const [startDate, setStartDate] = useState(new Date().toISOString())
  const [expiryDate, setExpiryDate] = useState("")
  const [description,setDescription] = useState("")
  const [allowRedirect, setAllowRedirect] = useState(false)
  const [showStartDateInput, setShowStartDateInput] = useState("display-none start-date-input")
 
  const loggedUser = useSelector(loginState)
  const query = useSelector(queryState)

  useEffect(() => {
    if (!loggedStatus()) {
      navigate("/")
    }
    else if (refreshAuth() === false) { navigate("/login") }

  }, [])




>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

  const canSave = () => {

    if (queryTitle !== "" && expiryDate !== "") {
      return false
    }
    else {
      return true
    }
  }

<<<<<<< HEAD


  const createQuery = (queryTitle) => {

    const creationTime = getTime();
=======
  useEffect(() => {

    if (query.id !== null && allowRedirect) {
      navigate({
        pathname: "/add-choices",
        search: `?qId=${query.id}`
      }, { replace: true })
      setAllowRedirect(false)
    }

  }, [query])


  //console.log(loggedUser.token)
  // const config = {headers: {Authorization: `Bearer ${Cookies.get("at")}`}}
  //console.log(config)
  // console.log(new Date(startDate).toISOString())
  //console.log(expiryDate)
  const createQuery = (queryTitle) => {

    const creationTime = getCurrentISOTime();


>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

    return {

      title: queryTitle,

      creationTime: creationTime,

<<<<<<< HEAD
      startDate: startDate,

      expiryDate: expiryDate,
=======
      startDate: new Date(startDate).toISOString(),

      expiryDate: new Date(expiryDate).toISOString(),

      description:description,
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

      totalSelectors: null,

      remainingSelectors: null,

<<<<<<< HEAD
      creatorUserId: userId
=======
      creatorUserId: Cookies.get("ud")
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
    }

  }

  return (
    <>
      <Navbar navItems={navItems} />

      <div className="page-header">Create a query</div>

      <div className="query-container">

<<<<<<< HEAD
        <div className="query-form-div">

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
            <input type="date" onChange={e => setStartDate(e.target.value)} className={showStartDateInput}></input>

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
=======
        <form className="query-form">

          <label htmlFor="query-title" id="title" className="input-title" >Title:</label>

          <input title="query-title" placeholder="What's the query?" onChange={(e) => setQueryTitle(e.target.value)} ref={titleRef}></input>

          <label htmlFor="start-date" className="input-title">Start date:</label>
          <select onChange={(e) => {
            setShowStartDateInput(e.target.value)
            if (e.target.value == "display-none start-date-input") {
              setStartDate(null)
            }
          }}>
            <option value="display-none start-date-input">Immediately</option>
            <option value="start-date-input">Specific date</option>
          </select>
          <input type="date" onChange={e => setStartDate(e.target.value)} className={showStartDateInput}></input>

          <label htmlFor="query-description" className="input-title">Description(optional):</label>
          <textarea title="query-description" placeholder="You can add a description of what the query is about here" onChange={(e) => {
           setDescription(e.target.value);
          }}></textarea>
          <label htmlFor="expiry-date" className="input-title">Expiry date:</label>
          
          <input title="expiry-date" placeholder="Select date" type="date" onChange={(e) => setExpiryDate(e.target.value)} ref={dateRef}></input>

          <button className="submit-button" disabled={canSave()} onClick={(e) => {
            e.preventDefault();
            dispatch(postQuery(createQuery(queryTitle)))
            setAllowRedirect(true)
            resetForm([titleRef, dateRef])
            //console.log(currentElectionState);
            //dispatch(changeElectionId(currentElectionState["id"]))
          }}>Create</button>


        </form>
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
      </div>
    </>
  )
}

export default CreateQuery;