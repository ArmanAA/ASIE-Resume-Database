import React, { Component } from 'react';

export default class Home extends Component {


  render() {
    return (
      <div>
        <h1>home page</h1>
        <a className="row" href='/login'>Login</a>
        <a className="row" href='/signup'>Signup</a>
      </div>
    );
  }
}