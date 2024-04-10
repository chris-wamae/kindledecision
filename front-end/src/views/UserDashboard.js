import "../styles/UserDashboard.css"
import Navbar from "../components/Navbar";
import DashboardAccount from "../components/Dashboard/DashboardAccount";
import Queries from "../components/Dashboard/Queries";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

function UserDashboard() {
  const [dashboardComponentId, setDashboardComponentId] = useState(1)
  const navigate = useNavigate();

  const dashBoardSetter = (componentId) => {
    if (componentId == 1) {
     return <Queries queriesType={"My"}/>
    }
    else if (componentId == 2) {
     return  <Queries queriesType={"Pending"}/>
    }
    else if (componentId == 3) {
     return  <Queries queriesType={"All"}/>
    }
    else if (componentId == 4) {
      return <DashboardAccount />
    }
  }

  return (
    <>
      <Navbar navItems={["Features", "Login", "How it Works"]} />
      <main>
        <div className="side-menu">
          <div className="combined-svg">
            <img className="user-svg" src="svg/account-icon.svg" onClick={() => setDashboardComponentId(1)}></img>
            <img className="listSvg" src="svg/list.svg" onClick={() => setDashboardComponentId(1)}></img>
          </div>
          <img src="svg/pending.svg"></img>
          <img src="svg/list.svg" onClick={() => setDashboardComponentId(3)}></img>
          <img src="svg/account-icon.svg" onClick={() => setDashboardComponentId(4)}></img>
          <img src="svg/add-icon.svg" onClick={() => navigate("/create-query")}></img>
        </div>
        <div className="page-content">
          {dashBoardSetter(dashboardComponentId)}
        </div>
      </main>



    </>
  )
}

export default UserDashboard;