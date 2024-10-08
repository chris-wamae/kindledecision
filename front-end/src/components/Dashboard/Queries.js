import "../../styles/Queries.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {queryChangeStatus,setQueryChange} from "../../features/querySlice"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie";

function Queries({ queriesType }) {
  //const userId = useSelector(currentUserId)
  const [whichQueries, setWhichQueries] = useState(true);
  //const [myQueries, setMyQueries] = useState([])
  //const [pendingQueries, setPendingQueries] = useState([])
  //const [allQueries, setAllQueries] = useState([])
  const [unfilteredQueries, setUnfilteredQueries] = useState([])
  const [queries, setQueries] = useState([])
  const [filterIds, setFilterIds] = useState([])
  const queryChanged = useSelector(queryChangeStatus)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const pendingQueryFilter = (idArray, queryId) => {
    let result = true;
    idArray.forEach(element => {
      if (element == queryId) {
        result = false;
      }
    });
    return result;
  }

  useEffect(() => {
    let nr = unfilteredQueries.filter(q => pendingQueryFilter(filterIds, q.id))
    setQueries(nr);
  }, [filterIds])


  useEffect(() => {

    console.log("fetching queries")

    if (queriesType == "My") {
      axios.get(`${process.env.REACT_APP_BASE_URL}query/created-querys/${Cookies.get("ud")}`, { headers: { Authorization: `Bearer ${Cookies.get("at")}` } }).then(r => setQueries(r.data))
      //setQueries(dummyQueries())
    }
    else if (queriesType == "Pending") {
      axios.get(`${process.env.REACT_APP_BASE_URL}query/pending-querys/${Cookies.get("ud")}`, { headers: { Authorization: `Bearer ${Cookies.get("at")}` } }).then(r => {
        setUnfilteredQueries(r.data.queries)
        setFilterIds(r.data.selections)
      })
    }

    else if (queriesType == "All") {
      axios.get(`${process.env.REACT_APP_BASE_URL}query/user-querys/${Cookies.get("ud")}`, { headers: { Authorization: `Bearer ${Cookies.get("at")}` } }).then(r => setQueries(r.data))
      //setQueries(dummyQueries())
    }
  }, [queriesType])

  function QueriesDisplay() {
    return queries.map(e => {
      return <div key={e.id} className="single-query" onClick={() => {
        dispatch(setQueryChange(true))
        navigate({
          pathname: "/query",
          search: `?qId=${e.id}`
        }

        )
      }}>
        <div className="query-title">{e.title}</div>
        <div className="other-container">
          <div className="dates">{e.startDate ? e.startDate.substring(0, 10) : "Open"}</div>
          <div className="dates">{e.expiryDate.substring(0, 10)}</div>
          <div className="selections">
            <div className="query-info">
              <div className="query-selectioncount">
                <div>{e.totalSelections - e.remainingSelections}</div>
                <div>/{e.totalSelections}</div>
              </div>

              <div className="query-status">{e.remainingSelections == "0" ? "completed" : "ongoing"}</div>
            </div>
          </div>
        </div>

      </div>
    })
  }
  return (
    <>
      {/* <section className="query-selectors">
        <button onClick={() => setWhichQueries(true)} className={whichQueries ? "query-selector-active" : "query-selector-inactive"}>My queries</button>
        <button onClick={() => setWhichQueries(false)} className={!whichQueries ? "query-selector-active" : "query-selector-inactive"}>All queries</button>
      </section> */}
      <section className="query-section">
        {/* <button>Create a query</button> */}
        <div className="page-header">{queriesType} queries</div>
        <div className="query-list-container">
          <div className="query-headers">
            <p>Title</p>
            {/* <div>Type</div> */}
            <div>
              <div>Start date</div>
              <div>Close date</div>
              {/* <div>Participants</div> */}
              <div>Status</div>
            </div>

          </div>
          <div className="query-list">
            {queries.length > 0 ?
              QueriesDisplay(whichQueries) :
              <div className="no-query-info">
                {queriesType == "My" ? "You have no queries, please click the plus button on the left to create one"
                  : queriesType == "Pending" ? "You have no pending queries that you need to participate in" 
                    : queriesType == "All" ? "You have not created or been added to any queries. You can create a query by clicking the plus button on the left" 
                      : ""
                }
              </div>}
          </div>
        </div>

      </section>
    </>
  )
}

export default Queries;
