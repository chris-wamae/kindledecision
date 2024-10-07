import './App.css';
import Landingpage from './views/Landingpage';
import Featurespage from './views/Featurespage';
import Signup from './views/Signup';
import Login from './views/Login';
<<<<<<< HEAD
import Queries from './views/Queries';
import AccountManagement from './views/AccountManagement';
=======
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
import CreateQuery from './views/CreateQuery';
import NewQuery from './views/NewQuery';
import CreateChoice from './views/CreateChoice';
import AddSelectors from './views/AddSelectors';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { postQuery } from './features/querySlice';
<<<<<<< HEAD
=======
import SingleQuery from './views/SingleQuery';
import Selectpage from './views/Selectpage';
import SelectionSuccess from './views/SelectionSuccess';
import UserDashboard from './views/UserDashboard';
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

function App() {
  return (
   <>
     <Router>
      <Routes>
      <Route exact="true" path="/" element={<Landingpage/>}></Route>
<<<<<<< HEAD
      <Route exact path="/features" element={<Featurespage/>}></Route>
      <Route exact path="/sign-up" element={<Signup/>}></Route>
      <Route exact path="/login" element={<Login/>}></Route>
      <Route exact path="/account-management" element={<AccountManagement/>}></Route>
      <Route exact path="/create-query" element={<CreateQuery/>}></Route>
      <Route exact path="/queries" element={<Queries/>}></Route>
      <Route exact path="/new-query" element={<NewQuery/>}></Route>
      <Route exact path="/add-choices" element={<CreateChoice/>}></Route>
      <Route exact path="/add-participants" element={<AddSelectors/>}></Route>
=======
      <Route exact path="/about" element={<Featurespage/>}></Route>
      <Route exact path="/sign-up" element={<Signup/>}></Route>
      <Route exact path="/login" element={<Login/>}></Route>
      <Route exact path="/create-query" element={<CreateQuery/>}></Route>
      {/* <Route exact path="/queries" element={<Queries/>}></Route> */}
      <Route exact path="/new-query" element={<NewQuery/>}></Route>
      <Route exact path="/add-choices" element={<CreateChoice/>}></Route>
      <Route exact path="/add-participants" element={<AddSelectors/>}></Route>
      <Route path="/query" element={<SingleQuery/>}></Route>
      <Route path="/selection" element={<Selectpage/>}></Route>
      <Route exact path="/successful-selection" element={<SelectionSuccess/>}></Route><Route/>
      <Route path="/dashboard" element={<UserDashboard/>}/>
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
      </Routes> 
     </Router>
   </>
  );
}

export default App;
