import React, { Component } from 'react';

export default class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data) {
      this.setState({data: nextProps.data})
    }
  }

  render() {
    if(this.state.data) {
      var profilepic = "assets/images/profilepic.jpg";
      var bio = "Some sentences";
      var fname = this.state.data.fname;
      var lname = this.state.data.lname;
      var street = this.state.data.street;
      var city = this.state.data.city;
      var state = this.state.data.state;
      var zip = this.state.data.zip;
      var phone = this.state.data.phone;
      var email = this.state.data.email;
      var regionalclient = this.state.data.regionalclient;
      var rehabclient = this.state.data.rehabclient;
      var conditions = this.state.data.conditions;
      var support = this.state.data.support;

      var conditions_list = conditions.map((condition) => {
        return <li key={condition}>{condition}<br/></li>
      });
    }
    return (
      !this.props.data ?
        <span></span>
      :
        <div id="basic" className="row">
          <div className="three columns">
            <img className="profile-pic"  src={profilepic} alt="Profile Pic" />
          </div>
          <div className="nine columns main-col">
            <h2>About Me</h2>
            <p>{bio}</p>
            <div className="row">
              <div className="columns contact-details">
                <h2>Contact Details</h2>
                <p className="address">
                  {fname} {lname}<br/>
                  {street}<br />
                  {city} {state}, {zip}<br/>
                  {phone}<br/>
                  {email}<br/>
                  Regional Center Client: {regionalclient}<br/>
                  Department of Rehabilitation Client: {rehabclient}<br/>
                  Disabilities:<br/>
                  {conditions_list}
                </p>
                <h3>Support Contact</h3>
                  <p>{support.name}<br/>
                  {support.email}<br/>
                  {support.phone}</p><br/>
              </div>
              <div className="columns download"></div>
            </div>
          </div>
        </div>
    );
  }
}