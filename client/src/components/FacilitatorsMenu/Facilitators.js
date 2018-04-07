import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import MaterialTitlePanel from '../AdminComponents/MaterialTitlePanel';
import SidebarContent from '../AdminComponents/MenuBar';
import ProfileList from './ProfileList';
import './FacilitatorStyle.css';
import AccountBar from '../AccountBar.js'
const mql = window.matchMedia('(min-width: 800px)');

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mql: mql,
      docked: true,
      open: false,
      count: 0,
      user: null,
      deleteClicked: false,
      
    }


    const self = this;

    fetch('/api/fill/facilitators', {
      method: 'POST',
      credentials: 'include'
    }).then(response => {
      response.json().then(json => {
        console.log("SearchPage", json);
        if(json) {
          self.setState({profile: json});
        }
      })
    });
    //fill data
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }


  componentDidMount() {
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql: mql, docked: mql.matches});
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
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
    var url = '/api/search/facilitators?' + "firstName=" + event.target.firstName.value+ "&lastName=" + event.target.lastName.value
    + "&email=" + event.target.email.value;
    console.log(url);
    fetch(url, {
      method: 'GET',
      credentials: 'include'
    }).then(response => {
      response.json().then(json => {
        console.log("SearchPage", json);
        if(json) {
          self.setState({profile: json});
        }
      })
    });
  }

  render() {
    const sidebar = <SidebarContent />;

    const contentHeader = (
      <span>
        {!this.state.docked &&
         <button onClick={this.toggleOpen.bind(this)}>=</button>}
        <span></span>
      </span>);
    return (
        <div style={{backgroundColor: '#111'}}>
           <Sidebar sidebar={sidebar} docked={this.state.docked} open={this.state.open} onSetOpen={this.onSetOpen}>
            <MaterialTitlePanel  title={contentHeader}>
             <AccountBar/>
              <div className="container">
              <div className="row">

                <form className="col-12" onSubmit={this.handleSubmit}>
                  <div className="input-group">
                    <input type="text" name="firstName" className="form-control col-sm-8" placeholder="Search by first name"/>
                    <input type="text" name="lastName" className="form-control col-sm-8" placeholder="Search by last name"/>
                    <input type="text" name="email" className="form-control col-sm-8" placeholder="Search by email"/>
                    <input className="btn btn-primary mb-2 col-sm-2 mx-1" type="submit" value="Search"/>
                  </div>
                </form>
               
              </div>
              <div className="row">
                <div className="col">

                  <ProfileList data={this.state.profile} />
                </div>
              </div>
            </div>
            </MaterialTitlePanel>
          </Sidebar>
        </div>
          
    );
  }
}