import './App.css';
import Landingpage from './views/Landingpage';
import Featurespage from './views/Featurespage';
import Signup from './views/Signup';
import Login from './views/Login';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

function App() {
  return (
   <>
     <Router>
      <Routes>
      <Route exact path="/" element={<Landingpage/>}></Route>
      <Route exact path="/features" element={<Featurespage/>}></Route>
      <Route exact path="/sign-up" element={<Signup/>}></Route>
      <Route exaxt path="/login" element={<Login/>}></Route>
      </Routes> 
     </Router>
   </>
  );
}

export default App;
