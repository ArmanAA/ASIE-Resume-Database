import React, {Component} from 'react';
import MaterialTitlePanel from '../AdminComponents/MaterialTitlePanel.js';
import SidebarContent from '../AdminComponents/MenuBar.js';
import Sidebar from 'react-sidebar';
import ProfileComponent from './ProfileComponent.js';


const mql = window.matchMedia('(min-width: 800px)');


export default class EmployerProfile extends Component{
	
	constructor(props){
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
    
	}

	onSetOpen(open) {
	    this.setState({open: open});
	  }

 	toggleOpen(ev) {
	    this.setState({open: true});

	    if (ev) {
	      ev.preventDefault();
	    }
	  }

	componentWillMount() {
	    mql.addListener(this.mediaQueryChanged);
	    this.setState({mql: mql, docked: mql.matches});
 	}


 	mediaQueryChanged() {
	    this.setState({
	      mql: mql,
	      docked: this.state.mql.matches,
	    });
  	}

	render(){
		const sidebar = <SidebarContent />;
		 const contentHeader = (
		      <span>
		        {!this.state.docked &&
		         <button className="btn-toggle-menu" onClick={this.toggleOpen.bind(this)}>=</button>}
		        <span></span>
		      </span>);

		return(
			<div>
			<Sidebar sidebar={sidebar} docked={this.state.docked} open={this.state.open} onSetOpen={this.onSetOpen}>
			<MaterialTitlePanel  title={contentHeader}>
			<ProfileComponent />
			</MaterialTitlePanel>
			</Sidebar>
			</div>

			);
	}
}