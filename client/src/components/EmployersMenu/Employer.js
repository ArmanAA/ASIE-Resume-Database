import React, { Component } from "react";
import styles from "../SearchMenu/SearchPage.css";

import { Clickable, StopPropagation } from "react-clickable";

export default class Employer extends Component {
  renderDetails(key, label) {
    if (this.props[key]) {
      return (
        <div className="detail">
          {label} {this.props[key]}
        </div>
      );
    }
  }
  handleClick() {
    <a
      href="http://localhost:3001/tempemp"
      target="_blank"
      onclick="console.log('The link was clicked.'); return false"
    >
      Click me
    </a>;
  }

  render() {
    return (
      <li className="container-fluid">
        {this.renderDetails("firstName", "First Name:")}
        {this.renderDetails("lastName", "Last Name:")}
        {this.renderDetails("subject", "Subject:")}
        {this.renderDetails("email", "Email:")}
      </li>
    );
  }
}
