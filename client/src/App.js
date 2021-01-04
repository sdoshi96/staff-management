import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cookies from 'js-cookie';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Forms from "./components/Admin/Forms";
import SignIn from "./components/Admin/SignIn";
import SignUp from "./components/Admin/SignUp";
import HrSignIn from "./components/HR/HrSignIn";
import Dashboard from "./components/Admin/Dashboard";
import HrDashboard from "./components/HR/HrDashboard";
import HrForms from "./components/HR/HrForms";
import EmpSignIn from "./components/Employee/EmpSignIn";
import EmpDashboard from "./components/Employee/EmpDashboard";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import "./App.css";
import LandingPage from "./components/Landing Page/LandingPage";

const token = Cookies.get('jwt');
if(token){
  setAuthToken(token);
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    //store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
        <Route exact path="/" component={LandingPage} />
          <Route exact path="/admin-login" component={SignIn} />
          <Route exact path="/admin-signup" component={SignUp} />
          <Route exact path="/hr-login" component={HrSignIn} />
          <Route exact path="/emp-login" component={EmpSignIn} />
          <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/hr-dashboard" component={HrDashboard} />
              <PrivateRoute exact path="/emp-dashboard" component={EmpDashboard} />
              <PrivateRoute exact path="/add-hr" component={Forms} />
              <PrivateRoute exact path="/add-employee" component={HrForms} />
            </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
