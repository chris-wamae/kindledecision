import { useEffect, useState } from "react";
import "../styles/CreateChoice.css"
import DynamicList from "../components/DynamicList";
import { useSelector, useDispatch } from "react-redux";
import { postChoice } from "../features/choiceSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { queryState } from "../features/querySlice";
import Cookies from "js-cookie";
import { timeAfterMinutes } from "../Helper/Time";
import axios from "axios";
import { refreshAuth, loggedStatus } from "../Helper/Auth";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function CreateChoice() {
  const navItems = [""]
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentQuery = useSelector(queryState)
  const [choiceName, setChoiceName] = useState("")
  const [queryChoices, setQueryChoices] = useState([])
  const [choiceDescriptions, setChoiceDescriptions] = useState([]);
  const [description,setDescription] = useState("")
  //const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (!loggedStatus()) {
      navigate("/")
    }
    else if (refreshAuth() === false) { navigate("/login") }
  }, [])

  const choiceDispatcher = () => {
    queryChoices.forEach((e,i) => {
      dispatch(postChoice({
        id: searchParams.get("qId"), post: {
          title: e, queryId: searchParams.get("qId"),
          description: choiceDescriptions[i]
        }
      }))
    })
    navigate({
      pathname: "/add-participants",
      search: `?qId=${searchParams.get("qId")}`
    }, { replace: true })
  }

  const removeOption = (e) => {
    let newChoices = queryChoices.filter((c, i) => i !== e)
    setQueryChoices(newChoices);
  }

  const buttonDisable = (array) => array.length > 1 ? false : true

  return (
    <>
      <Navbar navItems={navItems} />
      <div className="page-container">

        <div className="page-title">Query choices</div>

        <form className="create-choice-form">

          <label htmlFor="choice-input" className="choice-label">Choice:</label>

          <input id="choice-input" className="enter-choice" placeholder="Please enter option for participants" onChange={e => setChoiceName(e.target.value)}></input>


          <label htmlFor="choice-description" className="choice-label">Description(optional): </label>
          <textarea placeholder="You may add a description of the choice here" onChange={(e) => setDescription(e.target.value)}></textarea>

          <button className="add-button" onClick={(e) => {
            e.preventDefault();
            setChoiceDescriptions([...choiceDescriptions,description])
            setQueryChoices([...queryChoices, choiceName])
          }
          }>Add</button>
        </form>

        <div className="done-button-container">
        <button disabled={buttonDisable(queryChoices)} className="done-button" onMouseOver={e => e.target.textContent = "Done"} onMouseLeave={e => e.target.textContent = ">"} onClick={() => choiceDispatcher()}>&gt;</button>
        </div>

        <div className="dynamic-list-container">
        <div className="dynamic-list">
          <DynamicList listTitle={"Added choices"} itemsArray={queryChoices} removeOption={removeOption} />
        </div>
        </div>
  


      </div>
    </>
  )
}

export default CreateChoice;