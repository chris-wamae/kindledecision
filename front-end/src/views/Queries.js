import Navbar from "../components/Navbar";
import "../styles/Queries.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { currentUserId } from "../features/idSlice";
import { useSelector } from "react-redux";

function Queries() {
  const navItems = ["Features", "Login", "How it Works"]
  const userId = useSelector(currentUserId)
  const [whichQueries, setWhichQueries] = useState(true);
  const [queries, setQueries] = useState([])

  useEffect(() => {
  axios.get(`${process.env.REACT_APP_BASE_URL}queries?creatorUserId=${userId}`).then(r => setQueries(r.data))
  }, [])
  
  console.log(queries)

  const dummyMyQueries = [
    { id: 1, title: "Where to go for road trip", selectionsCast: 3, totalSelections: 10 },
    { id: 2, title: "What should we build in the Diani land", selectionsCast: 9, totalSelections: 10 },
    { id: 3, title: "What birthday gift should we get for grandma",selectionsCast: 5, totalSelections: 8 },
    { id: 4, title: "In whose house should we hold the next family meeting", selectionsCast: 3, totalSelections: 3 }
  ];

  const dummyAllQueries = [
    { id: 1, title: "Best Valorant maps for LAN tourney", selectionsCast: 0, totalSelections: 10 },
    { id: 2, title: "Should I get the AMG GT 45s or an AMG E63s", selectionsCast: 7, totalSelections: 8 },
    { id: 3, title: "Should Jenny leave her job : )", selectionsCast: 3, totalSelections: 6 },
    { id: 4, title: "Restaurant for besties lunch?", selectionsCast: 4, totalSelections: 6 },
    { id: 5, title: "Where to go for road trip", selectionsCast: 0, totalSelections: 9 },
    { id: 6, title: "What should we build in the Diani land", selectionsCast: 3, totalSelections: 3 },
    { id: 7, title: "What birthday gift should we get for grandma", selectionsCast: 6, totalSelections: 8 },
    { id: 8, title: "In whose house should we hold the next family meeting", selectionsCast: 4, totalSelections: 7 }
  ];

  function QueriesDisplay(whichQueries) {
    if (whichQueries == true) {
      return dummyMyQueries.map(e => {
        return <div key={e.id} className="single-query">
          <div className="query-title">{e.title}</div>
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
      })

    }

    else {
      return dummyAllQueries.map(e => {
        return <div key={e.id} className="single-query">
          <div className="query-title">{e.title}</div>
          <div className="selections">
            <div className="query-info">
            <div className="query-selectioncount">
              <div>{e.selectionsCast}</div>
              <div>/{e.totalSelections}</div>
              </div>
              <div className="query-status">{e.totalVotes !== e.votesCast ? "ongoing" : "completed"}</div>
            </div>
          </div>
        </div>
      })

    }
  }
  return (
    <>
      <Navbar navItems={navItems} />
      <section className="query-selectors">
        <button onClick={() => setWhichQueries(true)} className={whichQueries ? "query-selector-active" : "query-selector-inactive"}>My queries</button>
        <button onClick={() => setWhichQueries(false)} className={!whichQueries ? "query-selector-active" : "query-selector-inactive"}>All queries</button>
      </section>
      <section className="query-section">
        <button>Create a query</button>
        <div className="query-list-container">
          <div className="query-list">
            {QueriesDisplay(whichQueries)}
          </div>
        </div>

      </section>
    </>
  )
}

export default Queries;
