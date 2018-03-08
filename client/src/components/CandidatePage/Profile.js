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
                <img src="./assets/images/profilepic.jpg" alt="Profile Pic" />
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
                    fname} lname}<br/>
                    street}<br />
                    city} state}, zip}<br/>
                    phone}<br/>
                    email}<br/>
                    Regional Center Client: regionalclient}<br/>
                    Department of Rehabilitation Client: rehabclient}<br/>
                    Disabilities:<br/>
                    conditions_list}
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
                    <p>support_name}<br/>
                    support_email}<br/>
                    support_phone}</p>
                  </p>
            </div>
          </div>
        </div>

        

        </div>
    );
  }
}