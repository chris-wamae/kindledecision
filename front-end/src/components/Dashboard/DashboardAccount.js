import React, { useState } from "react";
import "../../styles/DashboardAccount.css"

const EditableDetail = ({ text, functionToCall, functionArg }) => {
  const [showEditIcon, setShowEditIcon] = useState(false);

  return (
    <div
      className="detail-data"
      onMouseEnter={() => setShowEditIcon(true)}
      onMouseLeave={() => setShowEditIcon(false)}
      onClick={() =>{functionToCall(functionArg)}}
    >
      {showEditIcon && <div className="edit-control"><img src="/svg/edit-icon.svg" alt="Edit Icon" /></div>}
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
      

  return (
    <>
      <div className="page-header">Account</div>

      <div className="card-container">

        <div className="card">
          <div className="header">Details</div>
          <div className="info-n-sub-header">
            <div className="sub-header" >Email</div>
            <EditableDetail text="dummyemail@mail.com" functionToCall={setShowEmailEdit} functionArg={!showEditEmail}/>
            {showEditEmail ?
            <form className="edit-form">
            <input type="text" placeholder="Enter new email"></input>
            <p>You'll need to enter your password to make this change</p>
            <input type="password" placeholder="Enter your password password"></input>
            <button>Change</button>
            </form>
                           :
            <span></span>
            }
          </div>
          <div className="info-n-sub-header">
            <div className="sub-header">Password</div>
            <EditableDetail text="dummyemailpassword" functionToCall={setShowEditPassword} functionArg={!showEditPassword} />
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
            <EditableDetail text="dummyemail@mail.com" functionToCall={setShowEditUserAnyonymity} functionArg={!showEditUserAnonymity} />
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
            <EditableDetail text="dummyemail@mail.com" functionToCall={setShowUserViewingMode} functionArg={!showEditUserViewingMode}/>
            {
            showEditUserViewingMode ? 
            <button onClick={() => setDarkMode(!darkMode)}>Change to {darkMode ? "light mode" : "darkmode"}</button>
                                    :
            <span></span>
            }
          </div>
        </div>
      </div>

    </>
  )
};

export default DashboardAccount;
