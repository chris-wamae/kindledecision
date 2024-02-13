import { useDispatch } from "react-redux"
import { useState } from "react"
import DynamicList from "../components/DynamicList";
import { postUserElection } from "../features/userElectionsSlice";
import { currentElectionId } from "../features/idSlice";
import { useSelector } from "react-redux";
import { validateEmail } from "../Helper/Form";
import { emailToolTipRenderer } from "../Helper/Form";
import { useEffect } from "react";
import axios from "axios";

//make email database search depend on physical button press by user
//move email validation to form Helper since it will no longer be using fetch



function AddVoters() {
    
    const stateElectionId = useSelector(currentElectionId)
    const dispatch = useDispatch();
    const [voterEmail, setVoterEmail] = useState("")
    const [electionVoters, setElectionVoters] = useState([])
    const [emailState, setEmailState] = useState(undefined)
    const [foundUser, setFoundUser] = useState(undefined)
   
    useEffect(() => {
      if(validateEmail(voterEmail))
      {
       setEmailState(true)
      }
      else if(voterEmail !== ""){
       setEmailState(false)
      }
      else if(voterEmail == "")
      {
        setEmailState(undefined)
      }
    },[voterEmail])
    
    useEffect(() => {
    

    },[emailState])

    useEffect(() => {
    if(emailState && foundUser == undefined)
    {
       setEmailState("notfound")
    }
    },[foundUser])

  const removeOption = (e) => {
      let newVoters = electionVoters.filter((c,i) => i !== e )
      setElectionVoters(newVoters);
    }

  const voterDispatcher = () => {
    electionVoters.forEach((e) => {
     dispatch(postUserElection({electionId:stateElectionId,
                          userId:null}))
    })
  }


  const buttonDisable = (array) => array.length > 1 ? false : true

  return (
    <>
      <div className="page-container">

        <div className="page-title">Election voters</div>

        <form>

          <label htmlFor="voter-input" className="voter-label">Voter:</label>
          {emailToolTipRenderer(emailState)}
          <input id="voter-input" className="enter-voter" placeholder="Please enter a voter's email" onChange={e => setVoterEmail(e.target.value)}></input>

          <button className="add-button" onClick={(e) => {
            e.preventDefault();
            setElectionVoters([...electionVoters, voterEmail])
          }
          }>Add</button>
        </form>

        <button disabled={buttonDisable(electionVoters)} className="done-button" onClick={() => voterDispatcher()}>Create election</button>

        <DynamicList listTitle={"Added voters"} itemsArray={electionVoters} removeOption={removeOption} />

      </div>
    </>
  )
}

export default AddVoters;








//const [electionVoters, setElectionVoters] = useState([])



// const [voterName, setVoterName] = useState("")

// const [voterEmail, setVoterEmail] = useState("")


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


// setElectionVoters([])
// setElectionChoices([])
// const voterInput = useRef(null)
//&& electionChoices.length !== 0 && electionVoters.length != 0
{/* <label htmlFor="election-choice" className="input-title">Option:</label>
            <input title="election-choice" placeholder="Enter name of option" ref={choiceInput} onChange={(e) => setChoiceName(e.target.value)}></input> */}