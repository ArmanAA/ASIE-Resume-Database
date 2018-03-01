import React, { Component } from 'react';

export default class ProfileComponent extends Component {
  constructor(props) {
    super(props);

    console.log(this.props);
    this.profilepic = "assets/images/profilepic.jpg";
    this.bio = "Some sentences";
    this.fname = "props.data.firstName";
    this.lname = "props.data.lastName";
    this.street = "street";
    this.city = "city";
    this.state = "state";
    this.zip = "zip";
    this.phone = "phone";
    this.email = "props.data.email";
  }
  render() {
    return (
      <div id="basic" className="row">
        <div className="three columns">
          <img className="profile-pic"  src={this.profilepic} alt="Profile Pic" />
        </div>
        <div className="nine columns main-col info-box">
          <h2>About Me</h2>
          <p>{this.bio}</p>
          <div className="row">
            <div className="columns contact-details">
              <h2>Contact Details</h2>
              <p className="address">
                {this.fname} {this.lname}<br/>
                {this.street}<br />
                {this.city} {this.state}, {this.zip}<br/>
                {this.phone}<br/>
                {this.email}
              </p>
            </div>
            <div className="columns download"></div>
          </div>
        </div>
      </div>
    );
  }
}