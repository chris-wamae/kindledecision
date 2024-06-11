import { useEffect, useState } from "react";
import "../styles/CreateChoice.css"
import DynamicList from "../components/DynamicList";
import { useSelector, useDispatch} from "react-redux";
import { currentQueryId } from "../features/idSlice";
import { postChoice } from "../features/choiceSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { queryState } from "../features/querySlice";
import Cookies from "js-cookie";
import { timeAfterMinutes } from "../Helper/Time";
import axios from "axios";
import { refreshAuth } from "../Helper/Auth";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function CreateChoice(){  
    const navItems = [""]
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentQuery = useSelector(queryState)
    const [choiceName, setChoiceName] = useState("")
    const [queryChoices, setQueryChoices] = useState([])
    //const location = useLocation();
    const [searchParams,setSearchParams] = useSearchParams()

    useEffect(() => {
      if(refreshAuth() === false){navigate("/login")};
      },[])
  
    const choiceDispatcher = () => {
      queryChoices.forEach((e) => {
        dispatch(postChoice({id:searchParams.get("qId"),post:{title:e, queryId:searchParams.get("qId")}}))
      })
      navigate({
        pathname:"/add-participants",
        search:`?qId=${searchParams.get("qId")}`}, {replace: true})
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

        <form className="create-choice-form">

          <label htmlFor="choice-input" className="choice-label">Choice:</label>

          <input id="choice-input" className="enter-choice" placeholder="Please enter option for participants" onChange={e => setChoiceName(e.target.value)}></input>

          <button className="add-button" onClick={(e) =>{
          e.preventDefault();
          setQueryChoices([...queryChoices, choiceName])
          }
            }>Add</button>
        </form>

        <button disabled={buttonDisable(queryChoices)} className="done-button" onMouseOver={e => e.target.textContent = "Done"} onMouseLeave={e => e.target.textContent = ">"} onClick={() => choiceDispatcher()}>&gt;</button>
        <div className="dynamic-list">
        <DynamicList listTitle={"Added choices"} itemsArray={queryChoices} removeOption={removeOption}/>
        </div>
        
        
        </div>
        </>
    )
}

export default CreateChoice;