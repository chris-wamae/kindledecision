import './App.css';
import Landingpage from './views/Landingpage';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

function App() {
  return (
   <>
     <Router>
      <Routes>
      <Route exact path="/" element={<Landingpage/>}></Route>
      </Routes> 
     </Router>
   </>
  );
}

export default App;
