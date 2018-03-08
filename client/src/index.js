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
    </Switch>
  </BrowserRouter>
, document.getElementById('root'));