import "../../styles/Queries.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { currentUserId } from "../../features/idSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { dummyQueries } from "./DummyQueries";

function Queries({ queriesType }) {
  const userId = useSelector(currentUserId)
  const [whichQueries, setWhichQueries] = useState(true);
  const [queries, setQueries] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (queriesType == "My") {
      //axios.get(`${process.env.REACT_APP_BASE_URL}queries?creatorUserId=0`).then(r => setQueries(r.data))
      setQueries(dummyQueries())
    }
    else if (queriesType == "Pending") {
           //axios.get(`${process.env.REACT_APP_BASE_URL}queries`).then(r => setQueries(r.data))
      setQueries(dummyQueries())
    }
    else if (queriesType == "All") {
      //axios.get(`${process.env.REACT_APP_BASE_URL}queries`).then(r => setQueries(r.data))
      setQueries(dummyQueries())
    }
  }, [queriesType])

  console.log(queries)

  function QueriesDisplay() {
    return queries.map(e => {
      return <div key={e.id} className="single-query" onClick={() => {
        navigate({
          pathname: "/query",
          search: `?id=${e.id}`
        }

        )
      }}>
        <div className="query-title">{e.title}</div>
        <div className="other-container">
          <div className="dates">{e.startDate ? e.startDate : "Open"}</div>
          <div className="dates">{e.expiryDate}</div>
          <div className="selections">
            <div className="query-info">
              <div className="query-selectioncount">
                <div>{e.selectionsCast}</div>
                <div>/{e.totalSelections}</div>
              </div>

              <div className="query-status">{e.totalSelections !== e.selectionsCast ? "ongoing" : "completed"}</div>
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
            {QueriesDisplay(whichQueries)}
          </div>
        </div>

      </section>
    </>
  )
}

export default Queries;
