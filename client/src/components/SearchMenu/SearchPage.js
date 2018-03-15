import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import MaterialTitlePanel from '../AdminComponents/MaterialTitlePanel';
import SidebarContent from '../AdminComponents/MenuBar';
import styles from './SearchPage.css';


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
      search: null
    }
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
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

  render() {
    const sidebar = <SidebarContent />;

    const contentHeader = (
      <span>
        {!this.state.docked &&
         <button class="btn-toggle-menu" onClick={this.toggleOpen.bind(this)}>=</button>}
        <span></span>
      </span>);
    return (

        !this.state.search ?
        <div>
           <Sidebar sidebar={sidebar} docked={this.state.docked} open={this.state.open} onSetOpen={this.onSetOpen}>
            <MaterialTitlePanel  title={contentHeader}>
				<div className="container center-area">
					<div className="row">
						<form className="col-12">
							<div className="input-group row">
							   	<input type="text" className="form-control col-sm-8 form-margins" placeholder="Search for candidates, skills, locations, and more"/>
								<button className="btn-search col-sm-2" type="button">Search</button>
								<button className="btn-no-style col-sm-2" type="button">Advanced</button>
							</div>
						</form>
					</div>
				</div>
            </MaterialTitlePanel>
          </Sidebar>
        </div>
          

        :

        <div>
           <Sidebar sidebar={sidebar} docked={this.state.docked} open={this.state.open} onSetOpen={this.onSetOpen}>
            <MaterialTitlePanel  title={contentHeader}>
				<div className="container center-horizontal">
					<div className="row">
						<form className="col-12">
							<div className="input-group row">
							   	<input type="text" className="form-control col-sm-8 form-margins" placeholder="Search for candidates, skills, locations, and more"/>
								<button className="btn-search col-sm-2" type="button">Search</button>
								<button className="btn-no-style col-sm-2" type="button">Advanced</button>
							</div>
						</form>
					</div>
				</div>
            </MaterialTitlePanel>
          </Sidebar>
        </div>
    );
  }
}