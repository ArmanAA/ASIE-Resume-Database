import React, { Component } from 'react';

export default class Login extends Component {

  render() {
    return (
      <div>
        <h1>Login page</h1>
        <a href='/'>Home</a>
        <form action="/signup" method="post">
          <div>
            <label>First Name:</label>
            <input type="text" name="firstName"/>
          </div>
          <div>
            <label>Last Name:</label>
            <input type="text" name="lastName"/>
          </div>
          <div>
            <label>Email:</label>
            <input type="text" name="email"/>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password"/>
          </div>
          <div>
            <input class="btn btn-primary" type="submit" value="Sign Up"/>
          </div>
        </form>
      </div>
    );
  }
}