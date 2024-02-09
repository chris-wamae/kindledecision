import { useState } from "react";
import "../styles/CreateChoice.css"
import DynamicList from "../components/DynamicList";

function CreateChoice(){   

    const [choiceName, setChoiceName] = useState("")
    const [electionChoices, setElectionChoices] = useState([])

    const removeOption = (e) => {
      let newChoices = electionChoices.filter((c,i) => i !== e )
      setElectionChoices(newChoices);
    }

    const buttonDisable = (array) => array.length > 1 ? false : true

    return(
        <>
        <div className="page-container">

         <div className="page-title">Election choices</div>

        <form >

          <label htmlFor="choice-input" className="choice-label">Choice:</label>

          <input id="choice-input" className="enter-choice" placeholder="Please enter option for voters" onChange={e => setChoiceName(e.target.value)}></input>

          <button className="add-button" onClick={(e) =>{
          e.preventDefault();
          setElectionChoices([...electionChoices, choiceName])
          }
            }>Add</button>
        </form>

        <button disabled={buttonDisable(electionChoices)} className="done-button" onMouseOver={e => e.target.textContent = "Done"} onMouseLeave={e => e.target.textContent = ">"}>&gt;</button>

        <DynamicList listTitle={"Added choices"} itemsArray={electionChoices} removeOption={removeOption}/>
        
        </div>
        </>
    )
}

export default CreateChoice;