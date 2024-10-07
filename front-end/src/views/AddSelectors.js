import { useDispatch } from "react-redux"
import { useState } from "react"
import DynamicList from "../components/DynamicList";
import { postUserQuery } from "../features/userQueriesSlice";
<<<<<<< HEAD
import { currentQueryId } from "../features/idSlice";
import { useSelector } from "react-redux";
import { validateEmail } from "../Helper/Form";
import { emailToolTipRenderer } from "../Helper/Form";
=======
import { useSelector } from "react-redux";
import { validateEmail } from "../Helper/Form";
import { authToolTipRenderer } from "../Helper/Form";
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
import { useEffect } from "react";
import axios from "axios";
import "../styles/AddSelectors.css"
import Navbar from "../components/Navbar";
import { queryState } from "../features/querySlice";
import { redirect, useNavigate } from "react-router-dom";
<<<<<<< HEAD
=======
import { refreshAuth,loggedStatus } from "../Helper/Auth";
import { useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

//make email database search depend on physical button press by user
//move email validation to form Helper since it will no longer be using fetch


<<<<<<< HEAD

function AddSelectors() {
  
  const navigate = useNavigate()
  const navItems = ["Features", "Login", "How it Works"]
=======
function AddSelectors() {

  const [loggedUserEmail,setLoggedUserEmail] = useState("")
  const navigate = useNavigate()
  const navItems = ["About"]
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
  const stateQueryId = useSelector(queryState)
  const dispatch = useDispatch();
  const [selectorEmail, setSelectorEmail] = useState("")
  const [querySelectors, setQuerySelectors] = useState([])
  const [emailState, setEmailState] = useState(undefined)
  const [foundUser, setFoundUser] = useState(undefined)
  const [disableSearch, setDisableSearch] = useState(true);
  const [showSearch, setShowSearch] = useState("inline");
  const [showAdd, setShowAdd] = useState("none");
<<<<<<< HEAD
  const [usersArray,setUsersArray] = useState([])
=======
  const [usersArray, setUsersArray] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [includeUser,setIncludeUser] = useState(false)

  useEffect(() => {
    if(!loggedStatus())
      {
       navigate("/")
      }
    else if (refreshAuth() === false) { navigate("/login") };
  }, [])

  useEffect(() => {
    if(loggedUserEmail == "")
    {
      axios.get(`${process.env.REACT_APP_BASE_URL}user/dashboard-details/${Cookies.get("ud")}`, {headers: {Authorization: `Bearer ${Cookies.get("at")}`}}).then(r => setLoggedUserEmail(r.data.email))
    }
    
    //console.log(loggedUserEmail)

    if(includeUser)
      {
      setQuerySelectors([...querySelectors,loggedUserEmail])
      setUsersArray([...usersArray,loggedUserEmail])
      }
    
    },[loggedUserEmail,includeUser])
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

  useEffect(() => {

    setFoundUser(undefined)

    if (validateEmail(selectorEmail)) {
      setEmailState(true)
      setDisableSearch(false)
    }
    else if (selectorEmail !== "") {
      setEmailState(false)
      setDisableSearch(true)
    }
    else if (selectorEmail == "") {
      setEmailState(undefined)
      setDisableSearch(true)
    }
  }, [selectorEmail])


  useEffect(() => {
    if (foundUser != undefined) {

<<<<<<< HEAD
      if (emailState && foundUser.length == 0) {
        setEmailState("notfound")
        setDisableSearch(true);
      }
      else if (foundUser.length > 0) {
=======
      if (emailState && foundUser.result == false) {
        setEmailState("notfound")
        setDisableSearch(true);
      }
      else if (foundUser.result == true) {
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
        setShowAdd("inline");
        setShowSearch("none");

      }

    }

    else {
      setShowAdd("none");
      setShowSearch("inline");
    }

  }, [foundUser])

<<<<<<< HEAD
  const removeOption = (e) => {
    let newSelectors = querySelectors.filter((c, i) => i !== e)
    setQuerySelectors(newSelectors);
  }

  const selectorDispatcher = () => {
    querySelectors.forEach((e,i) => {
      dispatch(postUserQuery({
        queryId: stateQueryId.id,
        userId: usersArray[i]
      }))
    })
    navigate("/new-query", {replace:true})
  }

  const emailSearch = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}Users?email=${selectorEmail}`).then(r => setFoundUser(r.data))
  }


=======
  const removeOption = (i) => {

    if(usersArray[i] == loggedUserEmail)
    {
    setIncludeUser(false)
    }

    let newSelectors = usersArray.filter((o, x) => x !== i)
    setUsersArray(newSelectors);
  }

  const selectorDispatcher = () => {
    querySelectors.forEach((e, i) => {
      dispatch(postUserQuery([searchParams.get("qId"), usersArray[i]]))
    })
    axios.put(`${process.env.REACT_APP_BASE_URL}query/total-selections`, { "queryId": `${searchParams.get("qId")}`, "totalSelections": `${querySelectors.length}` }, { headers: { Authorization: `Bearer ${Cookies.get("at")}` } })
    navigate({
      pathname: "/new-query",
      search: `?qId=${searchParams.get("qId")}`
    }, { replace: true })
  }

  const emailSearch = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}user/user-exists`, { "email": selectorEmail }, { headers: { Authorization: `Bearer ${Cookies.get("at")}` } }).then(r => setFoundUser(r.data))
  }
  
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
  const buttonDisable = (array) => array.length > 1 ? false : true

  return (
    <>
<<<<<<< HEAD
    <Navbar navItems={navItems}/>
      <div className="page-container">

        <div className="page-title">Query selectors</div>

        <form>

          <label htmlFor="voter-input" className="voter-label">Voter:</label>
          {emailToolTipRenderer(emailState)}
=======
      <Navbar navItems={navItems} />
      <div className="page-container">
        {/* <p>*for app to work use these emails in their order:
          <br></br>
          wamae@gmail.com
          <br></br>
          joker@gmail.com
          <br></br>
          killua@gmail.com
        </p> */}
        <div className="page-title">Add query participants</div>
        
        <form className="selector-form">
        

          <label htmlFor="voter-input" className="voter-label">Voter:</label>
          {authToolTipRenderer(emailState)}
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
          <input id="voter-input" className="enter-selector" placeholder="Please enter a selector's email" onChange={e => setSelectorEmail(e.target.value)}></input>

          <button style={{ display: `${showSearch}` }} disabled={disableSearch} className="search-button" onClick={
            (e) => {
              e.preventDefault()
              emailSearch()
            }
          }>Search for participant</button>

          <button style={{ display: `${showAdd}` }} className="add-button" onClick={(e) => {
            e.preventDefault();
            setQuerySelectors([...querySelectors, selectorEmail])
<<<<<<< HEAD
            setUsersArray([...usersArray,foundUser[0].id])
=======
            setUsersArray([...usersArray, selectorEmail])
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
          }
          }>Add</button>
        </form>

<<<<<<< HEAD
        <button disabled={buttonDisable(querySelectors)} className="done-button" onClick={(e) => {
          e.preventDefault();
          selectorDispatcher()}}>Create query</button>

        <DynamicList listTitle={"Added participants"} itemsArray={querySelectors} removeOption={removeOption} />
=======
        <div className="add-self-container">
        <label className="add-self-text">Add me as a participant in the query:</label>
        <input className="add-self-checkbox" type="checkbox" checked={includeUser} onChange={() => {setIncludeUser(true)}}></input>
        </div>

        <button disabled={buttonDisable(usersArray)} className="done-button" onClick={(e) => {
          e.preventDefault();
          selectorDispatcher()
        }}>Done</button>

        <DynamicList listTitle={"Added participants"} itemsArray={usersArray} removeOption={removeOption} />
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

      </div>
    </>
  )
}

export default AddSelectors;








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