import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './index.css';
import CanddiatePage from './components/CandidatePage/CandidatePage';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import WhoAreYou from './components/WhoAreYou';
import Ideal from './components/Ideal';
import Waiver from './components/Waiver';
import CandidatesMenu from './components/SearchMenu/SearchPage';
import DashBoardMenu from './components/DashboardMenu/Dashboard';
import EmployersMenu from './components/EmployersMenu/EmployerSearchPage';
import FacilitatorsMenu from './components/FacilitatorsMenu/Facilitators';
import TempEmp from './components/EmployersMenu/EmployerProfile';
import FacilitatorProfile from './components/FacilitatorsMenu/FacilitatorProfile';
import ContactUs from "./components/ContactUs/ContactUs";
import NotFoundPage from "./components/NotFoundPage";
import ForgotPassword from "./components/ForgotPassword";
import 'bootstrap/dist/css/bootstrap.min.css';
//import registerServiceWorker from './registerServiceWorker';

export default class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route exact path="/login" component={Login}/>
					<Route exact path="/signup" component={Signup}/>
					<Route exact path="/candidate/:id" component={CanddiatePage}/>
					<Route exact path="/whoareyou" component={WhoAreYou}/>
					<Route exact path="/ideal" component={Ideal}/>
					<Route exact path="/waiver" component={Waiver}/>
					<Route exact path="/candidates" component={CandidatesMenu}/>
					<Route exact path="/dashboard" component={DashBoardMenu}/>
					<Route exact path="/employers" component={EmployersMenu}/>
					<Route exact path="/facilitators" component={FacilitatorsMenu}/>
					<Route exact path="/contactus" component={ContactUs} />
					<Route exact path="/tempemp" component={TempEmp}/>
					<Route exact path="/facilitator" component={FacilitatorProfile}/>
					<Route exact path="/forgot" component={ForgotPassword}/>

					<Route component={NotFoundPage}/>
				</Switch>
			</BrowserRouter>
		)
	}
}