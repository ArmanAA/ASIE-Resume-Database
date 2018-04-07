import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import SidebarContent from '../AdminComponents/MenuBar';
import ProfileList from './ProfileList';
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
			user: null,
			profile: []
		}
		// populate table
		this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
		this.toggleOpen = this.toggleOpen.bind(this);
		this.onSetOpen = this.onSetOpen.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		mql.addListener(this.mediaQueryChanged);
		this.setState({mql: mql, docked: mql.matches});
		this.search("", "");
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

	search(interest, location) {
		const self = this;
		var url = '/api/search/candidate?' + "interests=" + interest + "&locations=" + location;
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

	handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target);
		this.search(event.target.interests.value, event.target.locations.value);
	}

	render() {
		const sidebar = <SidebarContent />;

		
		return (

				<div>
					<Sidebar sidebar={sidebar} docked={this.state.docked} open={this.state.open} onSetOpen={this.onSetOpen}>
						{
							this.state.docked ? <span></span> :
							
							<Navbar style={{backgroundColor: "#4EB9BE"}}>
								<Button style={{backgroundColor: "#4EB9BE"}} onClick={this.toggleOpen.bind(this)}>=</Button>
							</Navbar>
						}
							<div className="container">
								<div className="row">
									<form className="col-12" onSubmit={this.handleSubmit}>
										<div className="input-group">
											<input type="text" name="interests" className="form-control col-sm-8" placeholder="Search by interests"/>
											<input type="text" name="locations" className="form-control col-sm-8" placeholder="Search by locations"/>
											<input className="btn btn-default mb-2 col-sm-2 mx-1" type="submit" value="Search"/>
										</div>
									</form>
								</div>
								<div className="row">
									<div className="col">
										<ProfileList data={this.state.profile}/>
									</div>
								</div>
							</div>
							
					</Sidebar>
				</div>
		);
	}
}