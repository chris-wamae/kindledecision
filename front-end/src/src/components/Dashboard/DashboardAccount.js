import React, { useState } from "react";
import "../../styles/DashboardAccount.css"
import { useSelector } from "react-redux";
import { loginState} from "../../features/loginSlice";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import DeleteAccount from "../DeleteAccount";

const EditableDetail = ({ text, functionToCall, functionArg }) => {
  const [showEditIcon, setShowEditIcon] = useState(false);

  return (
    <div
      className="detail-data"
      onMouseEnter={() => setShowEditIcon(true)}
      onMouseLeave={() => setShowEditIcon(false)}
      onClick={() =>{functionToCall(functionArg)}}
    >
      {showEditIcon && <div className="edit-control"><img src="edit-icon.svg" alt="Edit Icon" /></div>}
      {text}
      <div className="detail-edit"></div>
    </div>
  );
};

const DashboardAccount = () => {

    const [showEditEmail,setShowEmailEdit] = useState(false)
    const [showEditPassword,setShowEditPassword] = useState(false)
    const [showEditSubscription,setShowEditSubscrition] = useState(false)
    const [showEditUserAnonymity, setShowEditUserAnyonymity] = useState(false)
    const [showEditUserViewingMode,setShowUserViewingMode] = useState(false) 
    const [darkMode,setDarkMode] = useState(false)
    const loggedUser = useSelector(loginState)
    const location = useLocation();
    const [userDetails, setUserDetails] = useState({})
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    //const params = new URLSearchParams(location.search);
  
    useEffect(() => {
    if(loggedUser.token == "")
      {
      axios.get(`${process.env.REACT_APP_BASE_URL}user/dashboard-details/${Cookies.get("ud")}`, {headers: {Authorization: `Bearer ${Cookies.get("at")}`}}).then(r => setUserDetails(r.data))
      }
    else
    {
      axios.get(`${process.env.REACT_APP_BASE_URL}user/dashboard-details/${Cookies.get("ud")}`, {headers: {Authorization: `Bearer ${Cookies.get("at")}`}}).then(r => setUserDetails(r.data))
    }
    },[loggedUser])
      

  return (
    <>
     <div className="page-header-container">
     <div className="page-header">Account</div>
     </div>  
      <div className="card-container">

        <div className="card">
          <div className="header">Details</div>
          <div className="info-n-sub-header">
            <div className="sub-header" >Email</div>
            {<EditableDetail text={userDetails.email} functionToCall={setShowEmailEdit} functionArg={!showEditEmail}/>}
            {showEditEmail ?
            <form className="edit-form">
            <input type="text" placeholder="Enter new email" onChange={e => setEmail(e.target.value)}></input>
            <p>You'll need to enter your password to make this change</p>
            <input type="password" placeholder="Enter your password password" onChange={e => setPassword(e.target.value)}></input>
            <button onClick={e => {
              e.preventDefault()
              axios.post(`${process.env.REACT_APP_BASE_URL}account/update-user-email`,{id:Cookies.get("ud"),
                email:email,
                password:password
              },{headers:{Authorization: `Bearer ${Cookies.get("at")}`}})
            }}>Change</button>
            </form>
                           :
            <span></span>
            }
          </div>
          <div className="info-n-sub-header">
            {/* <div className="sub-header">Password</div> */}
            {/* <EditableDetail text="********" functionToCall={setShowEditPassword} functionArg={!showEditPassword} /> */}
            {showEditPassword ?
            <form className="edit-form">
            <input type="password" placeholder="Enter new password"></input>
            <p>You'll need to enter your old password to make this change</p>
            <input type="password" placeholder="Enter old password"></input>
            <button>Change</button>
            </form>
                           :
            <span></span>
            }
          </div>
          <div className="info-n-sub-header">
            <div className="sub-header">Subscription Tier</div>
            <div>Free</div>
            {/* <EditableDetail text="Free" /> */}
          </div>
        </div>

        <div className="card">
          <div className="header">Settings</div>
          <div className="info-n-sub-header">
            <div className="sub-header">User visibility</div>
            {/* if using Editable detail remove div below */}
            <div>Visible</div>
            {/* <EditableDetail text={(userDetails.userVisibility) ? "Visible" : "Anonymous"} functionToCall={setShowEditUserAnyonymity} functionArg={!showEditUserAnonymity} /> */}
            {
            showEditUserAnonymity ?
            <form>  <label for="select-visibility">Select visibility</label>
                    <select type="dropdown" name="select-visibility">
                            
                            <option>Anonymous</option>
                            <option>Open</option>
                    </select>
            </form>
                                  :
                    <span></span>
            }
          </div>
          <div className="info-n-sub-header">
            <div className="sub-header">Viewing mode</div>
             {/* if using Editable detail remove div below */}
            <div>Lightmode</div>
            {/* <EditableDetail text={(userDetails.viewmode) ? "Lightmode" : "Darkmode"} functionToCall={setShowUserViewingMode} functionArg={!showEditUserViewingMode}/> */}
            {
            showEditUserViewingMode ? 
            <button onClick={() => setDarkMode(!darkMode)}>Change to {darkMode ? "light mode" : "darkmode"}</button>
                                    :
            <span></span>
            }
          </div>
        </div>
      </div>
      <DeleteAccount/>

    </>
  )
};

export default DashboardAccount;
