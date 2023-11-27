import "../styles/Navbar.css"
function Navbar({navItems}){
     
    return (
        <>
        <div class="nav-div">
            <img src="Casta-vote-text.png" id="app-icon"></img>                
            <div class="nav-links">
            {navItems.map(e => {
             return <a href="#">{e}</a>
            })}
            </div>
        </div>
        </>
    )
}

export default Navbar;