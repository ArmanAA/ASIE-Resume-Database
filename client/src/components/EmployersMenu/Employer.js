import React, { Component } from "react";
import styles from "../SearchMenu/SearchPage.css";

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

  render() {
    return (
      <li className="container-fluid">
        {this.renderDetails("firstName", "First Name:")}
        {this.renderDetails("lastName", "Last Name:")}
        {this.renderDetails("subject", "Subject:")}
      </li>
    );
  }
}
