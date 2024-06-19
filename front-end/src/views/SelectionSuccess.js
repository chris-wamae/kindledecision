import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { queryState, setQueryChange } from "../features/querySlice";
import "../styles/SelectionSuccess.css"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { refreshAuth ,loggedStatus} from "../Helper/Auth";
import { useDispatch } from "react-redux";
//import { queryStatus} from "@reduxjs/toolkit/query";
function SelectionSuccess() {

    const query = useSelector(queryState);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    useEffect(() => {
        if(!loggedStatus())
            {
             navigate("/")
            }
        else if(refreshAuth() === false){navigate("/login")};
        },[])
    

    useEffect(() => {
        // if(query.title == "")
        // {
        // navigate("/dashboard")
        // }
    },[query])


    return (
        <>
            <Navbar navItems={["About","Dashboard"]} />
            <div className="success-page-container">
                <div className="main-container">
                    <div className="success-title">Congratulations!</div>
                    <p>You have successfully participated in the query:</p>
                    <p>{query.title}</p>
                    <div className="btns-container">
                        <button onClick={() => {
                            navigate({
                                pathname: "/query",
                                search: `?qId=${query.id}`
                            })
                        }}>Back to query</button>
                        <button onClick={() => {
                        //dispatch(setQueryChange(true))
                        //navigate("/dashboard")
                        }}>Go to dashboard</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SelectionSuccess;