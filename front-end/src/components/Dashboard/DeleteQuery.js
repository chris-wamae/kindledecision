import axios from "axios";
import { useState } from "react";
import "../styles/DeleteQuery.css"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setQueryChange } from "../features/querySlice";

function DeleteQuery({queryId}) {
    
    const dispatch = useDispatch()
    const [showMessage, setShowMessage] = useState(false)
    const navigate = useNavigate()
    //const [deleteStatus,setDeleteStatus] = useState(undefined)
    //console.log(queryId)
    const deleteQueryAsync = () => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}query/${queryId}`).then((r) => {
if(r.status == 204)
{
dispatch(setQueryChange(true))
navigate("/dashboard")
}}
)
    }

    return (
        <div className="delete-query-container">
            <button className="del-button" onClick={() => setShowMessage(true)}>Delete query</button>
            <div className="del-confirm-container" style={{display: showMessage ? "" : "none"}}>
                <div className="del-message">Are you sure you wish to delete this query?</div>
                <div className="confirm-buttons">
                    <button onClick={() => {
                        setShowMessage(false)
                        deleteQueryAsync()
                    }}>Yes</button>
                    <button onClick={() => setShowMessage(false)}>No</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteQuery;