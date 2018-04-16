import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import MaterialTitlePanel from '../AdminComponents/MaterialTitlePanel';
import SidebarContent from '../AdminComponents/MenuBar';
import ProfileList from './ProfileList';
import './FacilitatorStyle.css';
import AccountBar from '../AccountBar'
import { Button, Navbar, NavbarToggler } from 'reactstrap';
const mql = window.matchMedia('(min-width: 768px)');

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mql: mql,
      docked: true,
      open: false,
      count: 0,
      user: {},
      subscribed: false,
      deleteClicked: false
    }
   
    //fill data
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    document.title = "Facilitators - ASIE Resume Database"
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  componentDidMount() {
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql: mql, docked: mql.matches});
    const self = this;

    fetch('/api/search/facilitator', {
      method: 'GET',
      credentials: 'include'
    }).then(response => {
      response.json().then(json => {
       
        if(json) {
          self.setState({profile: json});
        }
      })
    });

    fetch('/api/users/userinfo',{
      headers:{"Content-Type": "application/json"},
      method:'post',
      credentials: 'include'
    }).then(response => {
      response.json().then(json => {
        if(json.usertype !== "CAND" && json.usertype != null){
          fetch('/api/emaillist/exists', {
            method:'post',
            credentials: 'include'
          }).then(res => {
            res.json().then(json=>{
              this.setState({
                subscribed: json.subscribe
              })
            })

          });
        }
        this.setState({
          user: json
        })
      });
    });
  }



  onSetOpen(open) {
    this.setState({open: open});
  }

  mediaQueryChanged() {
    this.setState({
      mql: mql,
      docked: this.state.mql.matches,
    });
  }
  
  toggleOpen(ev) {
    this.setState({open: true});

    if (ev) {
      ev.preventDefault();
    }
  }

  handleSubmit(event) {
    const self = this;
    event.preventDefault();
    const data = new FormData(event.target);
    var url = '/api/search/facilitator?' + "firstName=" + event.target.firstName.value+ "&lastName=" + event.target.lastName.value
    + "&email=" + event.target.email.value;
    
    fetch(url, {
      method: 'GET',
      credentials: 'include'
    }).then(response => {
      response.json().then(json => {
        
        if(json) {
          self.setState({profile: json});
        }
      })
    });
  }

  render() {
    let usertype = this.state.user.usertype || "";
    let admin = ['SUPER', 'ADMIN'].indexOf(usertype) > -1;
    const sidebar = <SidebarContent admin={admin}/>;

    const contentHeader = (
      <span>
        {!this.state.docked &&
         <button onClick={this.toggleOpen.bind(this)}>=</button>}
        <span></span>
      </span>);
    return (
        <div style={{backgroundColor: '#111'}}>
           <Sidebar sidebar={sidebar} docked={this.state.docked} open={this.state.open} onSetOpen={this.onSetOpen}>
            {
              this.state.docked ? <span></span> :
              
              <Navbar style={{backgroundColor: "#4EB9BE"}}>
                <Button style={{backgroundColor: "#4EB9BE"}} onClick={this.toggleOpen.bind(this)}>=</Button>
              </Navbar>
            }
              <AccountBar user={this.state.user} subscribed={this.state.subscribed}/>
              <div className="container">
              <div className="row">
                <form className="col-12" onSubmit={this.handleSubmit}>
                  <div className="input-group">
                    <input type="text" name="firstName" className="form-control col-sm-8" placeholder="Search by first name"/>
                    <input type="text" name="lastName" className="form-control col-sm-8" placeholder="Search by last name"/>
                    <input type="text" name="email" className="form-control col-sm-8 rounded-right" placeholder="Search by email"/>
                    <input className="btn btn-primary mb-2 col-sm-2 mx-1" type="submit" value="Search"/>
                  </div>
                </form>
               
              </div>
              <div className="row mb-5">
                <div className="col">

                  <ProfileList data={this.state.profile} type={this.state.user.usertype}/>
                </div>
              </div>
            </div>
          </Sidebar>
        </div>
          
    );
  }
}