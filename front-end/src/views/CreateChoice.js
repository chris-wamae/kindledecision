import { useState } from "react";
import "../styles/CreateChoice.css"
import DynamicList from "../components/DynamicList";
import { useSelector, useDispatch} from "react-redux";
import { currentElectionId } from "../features/idSlice";
import { postChoice } from "../features/choiceSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { electionState } from "../features/electionSlice";

function CreateChoice(){  
    const navItems = ["Features", "Login", "How it Works"]
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentElection = useSelector(electionState)
    const [choiceName, setChoiceName] = useState("")
    const [electionChoices, setElectionChoices] = useState([])
    
    console.log(currentElection);
    const choiceDispatcher = () => {
      electionChoices.forEach((e) => {
        dispatch(postChoice({title:e, electionId:currentElection.id}))
      })
      navigate("/add-voters", {replace: true})
    }

    const removeOption = (e) => {
      let newChoices = electionChoices.filter((c,i) => i !== e )
      setElectionChoices(newChoices);
    }

    const buttonDisable = (array) => array.length > 1 ? false : true

    return(
        <>
          <Navbar navItems={navItems}/>
        <div className="page-container">

         <div className="page-title">Election choices</div>

        <form>

          <label htmlFor="choice-input" className="choice-label">Choice:</label>

          <input id="choice-input" className="enter-choice" placeholder="Please enter option for voters" onChange={e => setChoiceName(e.target.value)}></input>

          <button className="add-button" onClick={(e) =>{
          e.preventDefault();
          setElectionChoices([...electionChoices, choiceName])
          }
            }>Add</button>
        </form>

        <button disabled={buttonDisable(electionChoices)} className="done-button" onMouseOver={e => e.target.textContent = "Done"} onMouseLeave={e => e.target.textContent = ">"} onClick={() => choiceDispatcher()}>&gt;</button>

        <DynamicList listTitle={"Added choices"} itemsArray={electionChoices} removeOption={removeOption}/>
        
        </div>
        </>
    )
}

export default CreateChoice;