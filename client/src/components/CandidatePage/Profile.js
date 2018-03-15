import React, { Component } from 'react';

const regional = {
  "yes": "Yes",
  "no": "No",
  "idk": "I don't know"
}

export default class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.componentWillReceiveProps(props);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data) {
      this.setState({
        profilepic: "profile/" + nextProps.data.profilepic,
        fname: nextProps.data.fname,
        lname: nextProps.data.lname,
        street: nextProps.data.street,
        city: nextProps.data.city,
        state: nextProps.data.state,
        zip: nextProps.data.zip,
        phone: nextProps.data.phone,
        email: nextProps.data.email,
        regionalclient: nextProps.data.regionalclient,
        rehabclient: nextProps.data.rehabclient,
        conditions: nextProps.data.conditions
      });
    }
  }

  render() {
    return (
      !this.state ?
        <span></span>
      :
        <div className="container-fluid profile-wrapper">
        <div className="row">
          <div className="col-5 section-title">
            <h1><span>About Me</span></h1>
          </div>
          <div className="row">
            <div className="section col-10">
              <div className="row">
                <div className="profile-pic col-sm-4">
                  {this.state.profilepic ? <img src={this.state.profilepic} alt="Profile Pic" /> : <span></span>}
                </div>
                <div className='col-sm-6'>
                  <h1> {this.state.fname} {this.state.lname}<br/> </h1>
                  <p>
                    {this.state.street ? <span>{this.state.street}<br/></span> : <span></span>}
                    {this.state.city ? <span>{this.state.city} {this.state.state}, {this.state.zip}<br/></span> : <span></span>}
                    {this.state.phone ? <span>{this.state.phone}<br/></span> : <span></span>}
                    {this.state.email ? <span>{this.state.email}<br/></span> : <span></span>}
                    {this.state.regionalclient ? <span>Regional Center Client? {regional[this.state.regionalclient]}<br/></span> : <span></span>}
                    {this.state.rehabclient ? <span>Department of Rehabilitation Client? {regional[this.state.rehabclient]}<br/></span> : <span></span>}
                    {this.state.conditions_list && this.state.conditions_list.length > 0 ? <span>Disabilities:<br/>{this.state.conditions_list}</span> : <span></span>}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}