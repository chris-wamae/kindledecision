import './App.css';
import Landingpage from './views/Landingpage';
import Featurespage from './views/Featurespage';
import Signup from './views/Signup';
import Login from './views/Login';
import UserDashboard from './views/UserDashboard';
import AccountManagement from './views/AccountManagement';
import CreateElection from './views/CreateElection';
import NewElection from './views/NewElection';
import CreateChoice from './views/CreateChoice';
import AddVoters from './views/AddVoters';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { postElection } from './features/electionSlice';

function App() {
  return (
   <>
     <Router>
      <Routes>
      <Route exact="true" path="/" element={<Landingpage/>}></Route>
      <Route exact path="/features" element={<Featurespage/>}></Route>
      <Route exact path="/sign-up" element={<Signup/>}></Route>
      <Route exact path="/login" element={<Login/>}></Route>
      <Route exact path="/dashboard" element={<UserDashboard/>}></Route>
      <Route exact path="/account-management" element={<AccountManagement/>}></Route>
      <Route exact path="/create-election" element={<CreateElection/>}></Route>
      <Route exact path="/user-dashboard" element={<UserDashboard/>}></Route>
      <Route exact path="/new-election" element={<NewElection/>}></Route>
      <Route exact path="/add-choices" element={<CreateChoice/>}></Route>
      <Route exact path="/add-voters" element={<AddVoters/>}></Route>
      </Routes> 
     </Router>
   </>
  );
}

export default App;
