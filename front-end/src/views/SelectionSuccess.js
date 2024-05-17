import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { queryState } from "../features/querySlice";
import "../styles/SelectionSuccess.css"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { refreshAuth } from "../Helper/Auth";

function SelectionSuccess() {

    const query = useSelector(queryState);
    const navigate = useNavigate()

    useEffect(() => {
        if(refreshAuth() === false){navigate("/login")};
        },[])
    

    useEffect(() => {
        if(query.title == "")
        {
        navigate("/dashboard")
        }
    },[query])


    return (
        <>
            <Navbar navItems={["About"]} />
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
                        navigate("/dashboard")
                        }}>Go to dashboard</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SelectionSuccess;