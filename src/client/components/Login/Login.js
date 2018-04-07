import React, { Component } from 'react';
import '../Signup/css/Signup.css'
export default class Login extends Component {

  render() {
    return (
      <div className="container">
        
        <div className="col-sm-10 col-md-8 col-lg-6 form-box">
        <h1>Login page</h1>
        <form className="signup-form"action="/login" method="post">
          <div className="form-group">
          <div>
            <label>Email:</label>
            <input  className="form-control"type="text" name="email"/>
          </div>
          <div>
            <label>Password:</label>
            <input className="form-control" type="password" name="password"/>
          </div>
          <div>
            <input className="form-control btn btn-primary" type="submit" value="Log In"/>
          </div>
          </div>
        </form>
        </div>
        <a className="home btn btn-custom" role="button" href='/'>Home</a>
      </div>
    );
  }
}