import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './index.css';
import CanddiatePage from './components/CandidatePage/CandidatePage';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import WhoAreYou from './components/WhoAreYou';
import Ideal from './components/Ideal'
import Waiver from './components/Waiver'
import CandidatesMenu from './components/SearchMenu/SearchPage';
import DashBoardMenu from './components/DashboardMenu/Dashboard';
import EmployersMenu from './components/EmployersMenu/EmployerSearchPage';
import FacilitatorsMenu from './components/FacilitatorsMenu/Facilitators';
import TempEmp from './components/EmployersMenu/EmployerProfile';
import FacilitatorProfile from './components/FacilitatorsMenu/FacilitatorProfile';
import ContactUs from "./components/ContactUs/ContactUs";
import Logout from "./components/AccountBar";
import 'bootstrap/dist/css/bootstrap.min.css';
//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/candidate" component={CanddiatePage}/>
      <Route path="/whoareyou" component={WhoAreYou}/>
      <Route path="/ideal" component={Ideal}/>
      <Route path="/waiver" component={Waiver}/>
      <Route path="/candidates" component={CandidatesMenu}/>
      <Route path="/dashboard" component={DashBoardMenu}/>
      <Route path="/employers" component={EmployersMenu}/>
      <Route path="/facilitators" component={FacilitatorsMenu}/>
      <Route path="/contactus" component={ContactUs} />      
      <Route path="/tempemp" component={TempEmp}/>      
      <Route path="/facilitator" component={FacilitatorProfile}/>      
      <Route path="/testlogout" component={Logout}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
