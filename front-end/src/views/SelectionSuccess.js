import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { queryState } from "../features/querySlice";
import "../styles/SelectionSuccess.css"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SelectionSuccess() {

const query = useSelector(queryState);
const navigate = useNavigate()

useEffect(() => {
    if(query.title == "")
    {
    navigate("/dashboard")
    }
},[query])


return(
<>
<Navbar navItems={["Features", "Login", "How it Works"]}/>
<div className="main-container">
<div>Congratulations!</div>
<p>You have successfully participated in the query:</p>
<p>{query.title}</p>
<div className="btns-container">
    <button onClick={() => {
   navigate({pathname:"/query",
            search:`?Id=${query.id}`
})
    }}>Back to query</button>
    <button>Go to dashboard</button>
</div>
</div>
</>
)
}

export default SelectionSuccess;