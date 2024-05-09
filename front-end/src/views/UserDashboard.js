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
      <Navbar navItems={[""]} />
      <main className="dashboard-container">
        <div className="side-menu">
          <div className="combined-svg">
            <img className="user-svg" src="account-icon.svg" onClick={() => setDashboardComponentId(1)}></img>
            <img className="listSvg" src="list.svg" onClick={() => setDashboardComponentId(1)}></img>
          </div>
          <img src="pending.svg"></img>
          <img src="list.svg" onClick={() => setDashboardComponentId(3)}></img>
          <img src="account-icon.svg" onClick={() => setDashboardComponentId(4)}></img>
          <img src="add-icon.svg" onClick={() => navigate("/create-query")}></img>
        </div>
        <div className="page-content">
          {dashBoardSetter(dashboardComponentId)}
        </div>
      </main>



    </>
  )
}

export default UserDashboard;