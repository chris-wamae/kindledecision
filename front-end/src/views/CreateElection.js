import Navbar from "../components/Navbar";
import "../styles/CreateElection.css"
import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialCreate } from "../features/electionSlice";
import { electionState } from "../features/electionSlice";
import { postElection } from "../features/electionSlice";


function CreateElection() {

  const election = useSelector(electionState)
  
  const dispatch = useDispatch();

  const choiceInput = useRef(null)

  const voterInput = useRef(null)

  const navItems = ["Features", "Login", "How it Works"]

  const [electionTitle, setElectionTitle] = useState("")

  const [choiceName, setChoiceName] = useState("")

  const [voterName, setVoterName] = useState("")

  const [electionChoices, setElectionChoices] = useState([])

  const [electionVoters, setElectionVoters] = useState([])

  const removeOption = (stateArray, stateArraySetterFunction, index) => {
    const newArray = stateArray.filter((item) => item != stateArray[index])
    stateArraySetterFunction(newArray)
  }

  const canSave = () => {
    if (electionTitle !== "" && electionChoices.length !== 0 && electionVoters.length != 0) {
      return false
    }
    else {
      return true
    }
  }

  const getTime = () => {

    const date = new Date();

    const currentDate = date.toDateString();

    const currentTime = date.toLocaleTimeString();

    return `${currentDate} at ${currentTime}`;
  }


  const createElection = (electionTitle, electionChoices, electionVoters) => {

    const creationTime = getTime();

    return {

      title: electionTitle,

      choices: electionChoices,

      voters: electionVoters,

      totalVotes: electionVoters.length,

      creationDate: creationTime

    }

  }


  return (
    <>
      <Navbar navItems={navItems} />

      <div className="page-header">Create an election</div>

      <div className="election-container">

        <div className="choice-info">
          {
            <>
              {
                electionChoices.length == 0 ?
                  <div className="list-column"></div>
                  :
                  <div className="list-column">
                    <div className="info-title">Current choices</div>
                    <div className="choices-container">
                      {

                        electionChoices.map((choice, i) => {
                          if (electionChoices.length - 1 == i) {
                            return <>
                              <div className="option-container">
                                <div>{choice}</div>
                                <button className="remove-button" onClick={() => removeOption(electionChoices, setElectionChoices, i)}>X</button>
                              </div>
                            </>
                          }
                          else {
                            return <>
                              <div className="option-container">
                                <div>{choice}</div>
                                <button className="remove-button" onClick={() => removeOption(electionChoices, setElectionChoices, i)}>X</button>
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
        </div>


        <div className="election-form-div">

          <form className="election-form">

            <label htmlFor="election-title" id="title" className="input-title" >Tile:</label>

            <input title="election-title" placeholder="What's the election about?" onChange={(e) => setElectionTitle(e.target.value)}></input>

            <label htmlFor="election-choice" className="input-title">Option:</label>
            <input title="election-choice" placeholder="Enter name of option" ref={choiceInput} onChange={(e) => setChoiceName(e.target.value)}></input>

            <button className="add-button" disabled={choiceName == ""} onClick={(e) => {
              e.preventDefault();
              setElectionChoices([...electionChoices, choiceName])
              choiceInput.current.value = ""
              setChoiceName("")
            }

            }
            >Add</button>

            <label htmlFor="election-voter" className="input-title">Voter:</label>
            <input title="election-voter" placeholder="Enter name of voter" onChange={(e) => setVoterName(e.target.value)} ref={voterInput}></input>

            <button className="add-button" disabled={voterName
              == ""} onClick={(e) => {
                e.preventDefault();
                setElectionVoters([...electionVoters, voterName])
                voterInput.current.value = ""
                setVoterName("")
              }}>Add</button>

            <button className="submit-button" disabled={canSave()} onClick={(e) => {
              e.preventDefault();
              dispatch(postElection(createElection(electionTitle, electionChoices, electionVoters)))
            }}>Create</button>

          </form>

        </div>


        <div className="voter-info">
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

        </div>

      </div>

    </>
  )


}

export default CreateElection;