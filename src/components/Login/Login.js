import React, { Component } from 'react';

export default class Login extends Component {

  render() {
    return (
      <div>
        <h1>Login page</h1>
        <a href='/'>Home</a>
        <form action="/login" method="post">
          <div>
            <label>Email:</label>
            <input type="text" name="email"/>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password"/>
          </div>
          <div>
            <input type="submit" value="Log In"/>
          </div>
        </form>
      </div>
    );
  }
}