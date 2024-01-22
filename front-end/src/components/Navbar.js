import "../styles/Navbar.css"
import { Link } from "react-router-dom";
function Navbar({navItems}){
     
    function LinkFormater(rawLink){
    
    let formattedLink = rawLink.replace(/ /g,"-")
    return "/" + formattedLink.toLowerCase()
    }
    return (
        <>
        <div className="nav-div">
            <Link exact to="/"><img src="Casta-vote-text.png" id="app-icon"></img></Link>                
            <div className="nav-links">
            {navItems.map(e => {
            
             return <Link key={e} exact to={LinkFormater(e)}><span>{e}</span></Link>
            })}
            </div>
        </div>
        </>
    )
}

export default Navbar;