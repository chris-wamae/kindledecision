import Navbar from "../components/Navbar";
import { useState } from "react";
import { useRef } from "react";
function CreateElection() {

  const choiceInput = useRef(null)

  const voterInput = useRef(null)

  const navItems = ["Features", "Login", "How it Works"]

  const [electionTitle, setElectionTitle] = useState("")

  const [choiceName, setChoiceName] = useState("")

  const [voterName, setVoterName] = useState("")

  const [electionChoices, setElectionChoices] = useState([])

  const [electionVoters, setElectionVoters] = useState([])

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

      <div className="page-header"></div>

      <div className="election-container">

        <div className="choice-info">
          {
            <>
              <div className="choice-info-title">Current choices</div>
              {
                electionChoices.map(choice => {
                  return <>
                    <div>{choice}</div>
                    <button>-</button>
                  </>
                })
              }
            </>

          }
        </div>


        <div className="election-form-div">

          <form className="election-form">

            <label htmlFor="election-title">Tile:</label>

            <input title="election-title" placeholder="What's the election about?" onChange={(e) => setElectionTitle(e.target.value)}></input>

            <label htmlFor="election-choice">Option:</label>
            <input title="election-choice" placeholder="Enter name of option" ref={choiceInput} onChange={(e) => setChoiceName(e.target.value)}></input>

            <button className="add-button" onClick={(e) => {
              e.preventDefault();
              setElectionChoices([...electionChoices, choiceName])
              choiceInput.current.value = ""

            }

            }
            >Add</button>

            <label htmlFor="election-voter">Voter:</label>
            <input title="election-voter" placeholder="Enter name of voter" onChange={(e) => setVoterName(e.target.value)} ref={voterInput}></input>

            <button className="add-button" onClick={(e) => {
              e.preventDefault();
              setElectionVoters([...electionVoters, voterName])
              voterInput.current.value = ""
            }}>Add</button>

            <button onClick={(e) => {
              e.preventDefault();
              console.log(createElection(electionTitle, electionChoices, electionVoters))
            }}>Create</button>

          </form>

        </div>


        <div className="voter-info">

        </div>

      </div>

    </>
  )


}

export default CreateElection;