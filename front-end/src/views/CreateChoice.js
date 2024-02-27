import { useState } from "react";
import "../styles/CreateChoice.css"
import DynamicList from "../components/DynamicList";
import { useSelector, useDispatch} from "react-redux";
import { currentQueryId } from "../features/idSlice";
import { postChoice } from "../features/choiceSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { queryState } from "../features/querySlice";

function CreateChoice(){  
    const navItems = ["Features", "Login", "How it Works"]
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentQuery = useSelector(queryState)
    const [choiceName, setChoiceName] = useState("")
    const [queryChoices, setQueryChoices] = useState([])
    
    console.log(currentQuery);
    const choiceDispatcher = () => {
      queryChoices.forEach((e) => {
        dispatch(postChoice({title:e, queryId:currentQuery.id}))
      })
      navigate("/add-participants", {replace: true})
    }

    const removeOption = (e) => {
      let newChoices = queryChoices.filter((c,i) => i !== e )
      setQueryChoices(newChoices);
    }

    const buttonDisable = (array) => array.length > 1 ? false : true

    return(
        <>
          <Navbar navItems={navItems}/>
        <div className="page-container">

         <div className="page-title">Query choices</div>

        <form>

          <label htmlFor="choice-input" className="choice-label">Choice:</label>

          <input id="choice-input" className="enter-choice" placeholder="Please enter option for participants" onChange={e => setChoiceName(e.target.value)}></input>

          <button className="add-button" onClick={(e) =>{
          e.preventDefault();
          setQueryChoices([...queryChoices, choiceName])
          }
            }>Add</button>
        </form>

        <button disabled={buttonDisable(queryChoices)} className="done-button" onMouseOver={e => e.target.textContent = "Done"} onMouseLeave={e => e.target.textContent = ">"} onClick={() => choiceDispatcher()}>&gt;</button>

        <DynamicList listTitle={"Added choices"} itemsArray={queryChoices} removeOption={removeOption}/>
        
        </div>
        </>
    )
}

export default CreateChoice;