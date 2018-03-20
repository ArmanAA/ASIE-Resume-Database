import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import MaterialTitlePanel from '../AdminComponents/MaterialTitlePanel';
import SidebarContent from '../AdminComponents/MenuBar';
import styles from './SearchPage.css';
import ProfileList from './ProfileList';


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
      profile: []
    }
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
    console.log(event.target.interests.value);
    var url = '/api/search/candidate?' + "interests=" + event.target.interests.value
                  + "&skills=" + event.target.skills.value + "&locations=" + event.target.locations.value;
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
         <button className="btn-toggle-menu" onClick={this.toggleOpen.bind(this)}>=</button>}
        <span></span>
      </span>);
    return (

        <div>
           <Sidebar sidebar={sidebar} docked={this.state.docked} open={this.state.open} onSetOpen={this.onSetOpen}>
            <MaterialTitlePanel  title={contentHeader}>
      				<div className="container">
      					<div className="row">
      						<form className="col-12" onSubmit={this.handleSubmit}>
      							<div className="input-group">
      							   	<input type="text" name="interests" className="form-control col-sm-8" placeholder="Search by interests"/>
                        <input type="text" name="skills" className="form-control col-sm-8" placeholder="Search by skills"/>
                        <input type="text" name="locations" className="form-control col-sm-8" placeholder="Search by locations"/>
      								  <input className="btn btn-default mb-2 col-sm-2 mx-1" type="submit" value="Search"/>
      							</div>
      						</form>
      					</div>
                <div className="row">
                  <ProfileList data={this.state.profile}/>
                </div>
      				</div>
              
            </MaterialTitlePanel>
          </Sidebar>
        </div>
    );
  }
}