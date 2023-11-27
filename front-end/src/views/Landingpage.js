import Navbar from "../components/Navbar"
import "../styles/Landingpage.css"

function Landingpage(){
    const navItems = ["Features", "Login", "How it Works"]
    return (
     <>
     <Navbar navItems={navItems}/>
     <div class="main">

      <div class="info">

        <div class="info-text">

            <div class="main-header">
                The easiest way to make group decisions
            </div>

            <div class="sub-header">
                Casta Vote makes voting on anything increadibly simple while maintaining credibility and fairness.
            </div>

        </div>

        <div class="info-img">
        </div>

      </div>

      <div class="buttons">
      </div>

     </div>
     </>
    )
}

export default Landingpage;