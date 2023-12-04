import "../styles/Navbar.css"
import { Link } from "react-router-dom";
function Navbar({navItems}){
     
    function LinkFormater(rawLink){
    
    let formattedLink = rawLink.replace(/ /g,"-")
    return formattedLink.toLowerCase()
    }
    return (
        <>
        <div class="nav-div">
            <img src="Casta-vote-text.png" id="app-icon"></img>                
            <div class="nav-links">
            {navItems.map(e => {
            
             return <Link exact to={LinkFormater(e)}><a href="#">{e}</a></Link>
            })}
            </div>
        </div>
        </>
    )
}

export default Navbar;