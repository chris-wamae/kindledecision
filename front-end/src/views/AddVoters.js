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