<<<<<<< HEAD
function UserDashboard()
{
  return (
    <>
=======
import "../styles/UserDashboard.css"
import Navbar from "../components/Navbar";
import DashboardAccount from "../components/Dashboard/DashboardAccount";
import Queries from "../components/Dashboard/Queries";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { refreshAuth } from "../Helper/Auth";
import { queryChangeStatus } from "../features/querySlice";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { setQueryChange } from "../features/querySlice";
import { useDispatch } from "react-redux";
import { loggedStatus } from "../Helper/Auth"

function UserDashboard() {
  const [dashboardComponentId, setDashboardComponentId] = useState(1)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryHasChanged = useSelector(queryChangeStatus)
  const [userLoggedIn,setUserLoggedIn] = useState(false)

  useEffect(() => {
    if (queryHasChanged) {
      dispatch(setQueryChange(false))
      window.location.reload()
    }
  }, [queryHasChanged])

  useEffect(() => {
    if (!loggedStatus()) {
      navigate("/")
      setUserLoggedIn(false)
    }
    else if (refreshAuth() === false) { navigate("/login") }
    else
    {
    setUserLoggedIn(true)
    }
  }, [])


  const dashBoardSetter = (componentId) => {
    if (componentId == 1) {
      return <Queries queriesType={"My"} />
    } 
    else if (componentId == 2) {
      return <Queries queriesType={"Pending"} />
    }
    else if (componentId == 3) {
      return <Queries queriesType={"All"} />
    }
    else if (componentId == 4) {
      return <DashboardAccount />
    }
  }

  return (
    <>
      <Navbar navItems={["About"]} />
      <main className="dashboard-container">
        <div className="side-menu">
          <div className="combined-svg">
            <img className="user-svg" src="account-icon.svg" onClick={() => setDashboardComponentId(1)}></img>
            <img className="listSvg" src="list.svg" onClick={() => setDashboardComponentId(1)}></img>
          </div>
          <img src="pending.svg" onClick={() => { setDashboardComponentId(2) }}></img>
          <img src="list.svg" onClick={() => setDashboardComponentId(3)}></img>
          <img src="account-icon.svg" onClick={() => setDashboardComponentId(4)}></img>
          <img src="add-icon.svg" onClick={() => navigate("/create-query")}></img>
        </div>
        <div className="page-content">
          {userLoggedIn ? dashBoardSetter(dashboardComponentId)
          : <></>  
        }
        </div>
      </main>



>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
    </>
  )
}

export default UserDashboard;