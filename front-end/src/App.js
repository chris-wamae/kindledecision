import './App.css';
import Landingpage from './views/Landingpage';
import Featurespage from './views/Featurespage';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

function App() {
  return (
   <>
     <Router>
      <Routes>
      <Route exact path="/" element={<Landingpage/>}></Route>
      <Route exact path="/features" element={<Featurespage/>}></Route>
      </Routes> 
     </Router>
   </>
  );
}

export default App;
