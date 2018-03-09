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
      var profilepic = "profile/" + this.state.data.profilepic;
      var bio = "Some sentences";
      var fname = this.state.data.fname;
      var lname = this.state.data.lname;
      var street = this.state.data.street;
      var city = this.state.data.city;
      var state = this.state.data.state;
      var zip = this.state.data.zip;
      var phone = this.state.data.phone;
      var email = this.state.data.email;
      var regionalclient = this.state.data.regionalclient ? "Yes" : "No";
      var rehabclient = this.state.data.rehabclient ? "Yes" : "No";
      var conditions = this.state.data.conditions;
      var support = this.state.data.support;
      if(support) {
        var support_name = support.name;
        var support_email = support.email;
        var support_phone = support.phone;
      }

      if(conditions) {
        var conditions_list = conditions.map((condition) => {
          return <li key={condition}>{condition}<br/></li>
        });
      }
    }
    return (
      !this.props.data ?
        <span></span>
      :
        <div className="container-fluid profile-wrapper">
        <div className="row">
          <div className="col-5 section-title">
            <h1><span>About Me</span></h1>
          </div>
          <div className="row">
            <div className="section col-10">
              <div className="profile-pic">
                <img src={profilepic} alt="Profile Pic" />
              </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac leo felis. Vestibulum at purus id dolor aliquam consequat. Phasellus tempor sollicitudin ligula, non malesuada erat euismod sit amet. Nullam faucibus, ipsum eget ornare consequat, ipsum nisl consequat magna, ac posuere nisi ligula porta tellus. Nullam rutrum arcu arcu, sed feugiat turpis ultrices sit amet. Nulla hendrerit, libero in cursus faucibus, turpis quam cursus orci, ut venenatis orci ante vitae est. Cras pellentesque tortor a neque feugiat, at aliquam nisi finibus.</p>
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-5 section-title">
            <h1><span>Contact Details</span></h1>
          </div>
          <div className="row">
            <div className="section col-10">
                 <p className="address">
                    {fname} {lname}<br/>
                    {street ? <span>{street}<br/></span> : <span></span>}
                    {city ? <span>{city} {state}, {zip}<br/></span> : <span></span>}
                    {phone ? <span>{phone}<br/></span> : <span></span>}
                    {email ? <span>{email}<br/></span> : <span></span>}
                    {regionalclient ? <span>Regional Center Client: {regionalclient}<br/></span> : <span></span>}
                    {rehabclient ? <span>Department of Rehabilitation Client: {rehabclient}<br/></span> : <span></span>}
                    {conditions_list && conditions_list.length > 0 ? <span>Disabilities:<br/>{conditions_list}</span> : <span></span>}
                  </p>
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-5 section-title">
            <h1><span>Support Contact</span></h1>
          </div>
          <div className="row">
            <div className="section col-10">
                 <p className="address">
                    <p>{support_name}<br/>
                    {support_email}<br/>
                    {support_phone}</p>
                  </p>
            </div>
          </div>
        </div>

        

        </div>
    );
  }
}