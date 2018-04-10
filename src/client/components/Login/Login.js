import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import '../Signup/css/Signup.css'

export default class Login extends Component {


  render() {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search.slice(1));

    return (
      <div className="container">
        
        {
          (params.get('signup') != null) ?
              <Alert color="success">
                Sign up was successful! Please login.
              </Alert>
          :
            <span/>
        }
        {
          (params.get('error') != null) ?
              <Alert color="danger">
                Login credientials were not found
              </Alert>
          :
            <span/>
        }

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