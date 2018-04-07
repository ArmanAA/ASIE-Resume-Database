import React, { Component } from 'react';
import styles from './SearchPage.css';

export default class Profile extends Component {
  renderDetails(key, label){
    if (this.props[key]) {
      return (<div className="detail">{ label } { this.props[key] }</div>);
    }
  }

  render() {
    return (
      <li className="container-fluid">
        <img src={ "profile/" + this.props.profilepic } align="left" width="60" height="60" />
        { this.renderDetails('email', 'Email:') }
        { this.renderDetails('firstName', 'First Name:') }
        { this.renderDetails('lastName', 'Last Name:') }
        { this.renderDetails('zip', 'Zip Code:') }
      </li>
    );
  }
}