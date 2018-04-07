import React, { Component } from 'react';
import MenuBar from '../Home/MenuBar.js'
import './css/Signup.css';

export default class Login extends Component {
 componentDidMount(){
    document.title = "Register - ASIE Resume Database"
  }
  render() {
    return (
        <div>
           <MenuBar/>

        <div className="container">
        <div className="row">   
        <div className="col-sm-10 col-md-8 col-lg-6 form-box">
     
          <form className="signup-form" action="/signup" method="post">
            <div className="form-group">
              <h1>Registration</h1>
              <div>
                <label>First Name:</label>
                <input className="form-control" type="text" name="firstName"/>
              </div>
              <div>
                <label>Last Name:</label>
                <input className="form-control" type="text" name="lastName"/>
              </div>
              <div>
                <label>Email:</label>
                <input className="form-control" type="text" name="email"/>
              </div>
              <div>
                <label>Password:</label>
                <input className="form-control" type="password" name="password"/>
              </div>
              <div>
                <input type="checkbox" name="terms"/>
                <label> I have read and agree to the <a href=''>terms & conditions</a>. </label>
              </div>
              <div>
                <input className="btn btn-primary" type="submit" value="Sign Up"/>
              </div>
              </div>
            </form>
        </div> {/*col-8*/}
        </div> {/*row*/}
        </div> {/*container*/}
        </div> /*Empty div to wrap JSX*/
    );
  }
}