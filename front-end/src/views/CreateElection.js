import Navbar from "../components/Navbar";
import "../styles/CreateElection.css"
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialCreate } from "../features/electionSlice";
import { electionState } from "../features/electionSlice";
import { postElection } from "../features/electionSlice";
import ToolTip from "../components/ToolTip";
import { useNavigate } from "react-router-dom";
import { resetForm } from "../Helper/Form";
import { getTime } from "../Helper/Time";

function CreateElection() {
  
  const redirect = useNavigate();
  const election = useSelector(electionState)
  
  const dispatch = useDispatch();

  const titleRef = useRef(null)
  const dateRef = useRef(null)


 // const voterInput = useRef(null)


  const navItems = ["Features", "Login", "How it Works"]

  const [electionTitle, setElectionTitle] = useState("")



 // const [voterName, setVoterName] = useState("")

 // const [voterEmail, setVoterEmail] = useState("")

  const [expiryDate, setExpiryDate] = useState("")

  

  //const [electionVoters, setElectionVoters] = useState([])
  
 // const [emailInputClassName,setEmailInputClassName] = useState("")

 // const [validEmail, setValidEmail] = useState(undefined)  
 
 // const emailDataBaseSearch = () => {
 //   let num = Math.floor(Math.random() * 10)
 //   if(num < 5)
  //  {
  //    setValidEmail("notfound")
 //   }
 //   else
  //  {
 //      setValidEmail(true)
 //   }
 // }

  // const toolTipRenderer = (validity) => {
  //  if(validity == undefined)
  //  {
  //   return <ToolTip type={"error"} message={" Email is required"}/>
  //  }
  //  else if(validity == false)
  //  {
  //   return <ToolTip type={"error"} message={" Invalid email format"}/>
  //  }
  //  else if(validity == true)
  //  {
  //   return <ToolTip type={"success"} message={" This email can be added"}/>
  //  }
  //  else if(validity == "notfound")
  //  {
  //   return <ToolTip type={"error"} message={" A user with this email does not exist"}/>
  //  }
  // }

  // useEffect(()=>{
  // if(voterEmail == "")
  // {
  // setValidEmail(undefined)
  // }
  // else
  // {
  //  if(validateEmail(voterEmail) == false)
  //  {
  //   setValidEmail(false)
  //  }
  //  else
  //  {
  //   emailDataBaseSearch();
  //  }

  // }
   
  // },[voterEmail])


  // const validateEmail = (email) => {
  //   var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return regex.test(email);
  // }


  const canSave = () => {
    //&& electionChoices.length !== 0 && electionVoters.length != 0
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

      expiryDate:expiryDate,

      totalVotes:null,

      remainingVotes:null,

      creatorUserId:null
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

            {/* <label htmlFor="election-choice" className="input-title">Option:</label>
            <input title="election-choice" placeholder="Enter name of option" ref={choiceInput} onChange={(e) => setChoiceName(e.target.value)}></input> */}

            <label htmlFor="expiry-date" className="date-title">Expiry date:</label>
            <input title="expiry-date" type="date" onChange={(e) => setExpiryDate(e.target.value)} ref={dateRef}></input>

            {/* <button className="add-button" disabled={choiceName == ""} onClick={(e) => {
              e.preventDefault();
              setElectionChoices([...electionChoices, choiceName])
              choiceInput.current.value = ""
              setChoiceName("")
            }

            }
            >Add</button> */}

          {/* {toolTipRenderer(validEmail)}
          <label htmlFor="voter-email">Voter email:</label>
          <input type="email" placeholder="Please enter the email of the voter" onChange={e => setVoterEmail(e.target.value)}></input>

            <label htmlFor="election-voter" className="input-title">Voter:</label>
            <input title="election-voter" placeholder="Enter name of voter" onChange={(e) => setVoterName(e.target.value)} ref={voterInput}></input>

            <button className="add-button" disabled={voterName
              == ""} onClick={(e) => {
                e.preventDefault();
                setElectionVoters([...electionVoters, voterName])
                voterInput.current.value = ""
                setVoterName("")
              }}>Add</button> */}

            <button className="submit-button" disabled={canSave()} onClick={(e) => {
              e.preventDefault();
              dispatch(postElection(createElection(electionTitle)))
              resetForm([titleRef,dateRef])
              redirect("/add-choices", {replace: true})
              // setElectionVoters([])
              // setElectionChoices([])
              
            }}>Create</button>
          

          </form>

        </div>


        {/* <div className="voter-info">
          {
            <>
              {
                electionVoters.length == 0 ?
                  <div className="list-column"></div>
                  :
                  <div className="list-column">
                    <div className="info-title">Current voters</div>
                    <div className="choices-container">
                      {

                        electionVoters.map((voter, i) => {
                          if (electionVoters.length - 1 == i) {
                            return <>
                              <div className="option-container">
                                <div>{voter}</div>
                                <button className="remove-button" onClick={() => removeOption(electionVoters, setElectionVoters, i)}>X</button>
                              </div>
                            </>
                          }
                          else {
                            return <>
                              <div className="option-container">
                                <div>{voter}</div>
                                <button className="remove-button" onClick={() => removeOption(electionVoters, setElectionVoters, i)}>X</button>
                              </div>
                              <hr />
                            </>
                          }

                        })


                      }
                    </div>
                  </div>
              }

            </>

          }

        </div> */}

      </div>

    </>
  )


}

export default CreateElection;