import Navbar from "../components/Navbar";
import { useState } from "react";
function UserDashboard()
{   
    const navItems = ["Features", "Login", "How it Works"]
    const [whichElections,setWhichElections] = useState(true);
    const dummyMyElections = [
        { id: 1, title: "Where to go for road trip", votesCast: 3, totalVotes: 10 },
        { id: 2, title: "What should we build in the Diani land", votesCast: 9, totalVotes: 10 },
        { id: 3, title: "What birthday gift should we get for grandma", votesCast: 5, totalVotes: 8 },
        { id: 4, title: "In whose house should we hold the next family meeting", votesCast: 3, totalVotes: 3 }
      ];
      
      const dummyAllElections = [
        { id: 1, title: "Best Valorant maps for LAN tourney", votesCast: 0, totalVotes: 10 },
        { id: 2, title: "Should I get the AMG GT 45s or an AMG E63s", votesCast: 7, totalVotes: 8},
        { id: 3, title: "Should Jenny leave her job : )", votesCast: 3, totalVotes: 6 },
        { id: 4, title: "Restaurant for besties lunch?", votesCast: 4, totalVotes: 6 },
        { id: 5, title: "Where to go for road trip", votesCast: 0, totalVotes: 9 },
        { id: 6, title: "What should we build in the Diani land", votesCast: 3, totalVotes: 3 },
        { id: 7, title: "What birthday gift should we get for grandma", votesCast: 6, totalVotes: 8 },
        { id: 8, title: "In whose house should we hold the next family meeting", votesCast: 4, totalVotes: 7 }
      ];

      console.log(whichElections)
      
    function ElectionsDisplay(whichElections)
    {
      if(whichElections == true)
     {
       return dummyMyElections.map(e => {
       return <div key={e.id}>
            <div>{e.title}</div>
            <div>
                <div>{e.votesCast}</div>
                <div>{e.totalVotes}</div>
            </div>
        </div>
      })
  
     }
    
     else{
        return dummyAllElections.map(e => {
        return  <div key={e.id}>
                <div>{e.title}</div>
                <div>
                    <div>{e.votesCast}</div>
                    <div>{e.totalVotes}</div>
                </div>
            </div>
          })
        
     }
    }
    return (
    <>
      <Navbar navItems={navItems}/>
      <section>
        <button onClick={()=> setWhichElections(true)}>My elections</button>
        <button onClick={()=> setWhichElections(false)}>All elections</button>
      </section>
      <section>
        <button>Create an election</button>
        <div className="election-list">
            {ElectionsDisplay(whichElections)}
        </div>
      </section>
    </>
    )
}

export default UserDashboard;
