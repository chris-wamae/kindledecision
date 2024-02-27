import './App.css';
import Landingpage from './views/Landingpage';
import Featurespage from './views/Featurespage';
import Signup from './views/Signup';
import Login from './views/Login';
import Queries from './views/Queries';
import AccountManagement from './views/AccountManagement';
import CreateQuery from './views/CreateQuery';
import NewQuery from './views/NewQuery';
import CreateChoice from './views/CreateChoice';
import AddSelectors from './views/AddSelectors';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { postQuery } from './features/querySlice';

function App() {
  return (
   <>
     <Router>
      <Routes>
      <Route exact="true" path="/" element={<Landingpage/>}></Route>
      <Route exact path="/features" element={<Featurespage/>}></Route>
      <Route exact path="/sign-up" element={<Signup/>}></Route>
      <Route exact path="/login" element={<Login/>}></Route>
      <Route exact path="/account-management" element={<AccountManagement/>}></Route>
      <Route exact path="/create-query" element={<CreateQuery/>}></Route>
      <Route exact path="/queries" element={<Queries/>}></Route>
      <Route exact path="/new-query" element={<NewQuery/>}></Route>
      <Route exact path="/add-choices" element={<CreateChoice/>}></Route>
      <Route exact path="/add-participants" element={<AddSelectors/>}></Route>
      </Routes> 
     </Router>
   </>
  );
}

export default App;
