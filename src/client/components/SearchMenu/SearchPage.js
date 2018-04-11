import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import SidebarContent from '../AdminComponents/MenuBar';
import ProfileList from './ProfileList';
import SavedCandidatesList from './SavedCandidatesList';
import { Button, Navbar, NavbarToggler } from 'reactstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {
    Nav,
    NavItem,
    NavDropdown, // optional
    MenuItem, // optional
    TabContent,
    TabPane
} from '@trendmicro/react-navs';
 
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-navs/dist/react-navs.css';

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
			interest: null,
			location: null,
			interestOptions: [],
			locationOptions: [],
			profile: [],
			activeTab: 1
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
		fetch('/api/search/candidate/options', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		}).then(res => {
			return res.json();
		}).then(json => {
			if (json) {
				this.setState({interestOptions: json.interests, locationOptions: json.locations});
			}
		})
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

	handleChangeInterest = (selectedOption) => {
		this.setState({interest: selectedOption});
		if (!this.state.interest && !this.state.location) {
			this.search("", "");
		}
	}

	handleChangeLocation = (selectedOption) => {
		this.setState({location: selectedOption});
		if (!this.state.interest && !this.state.location) {
			this.search("", "");
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
		
		let interest = this.state.interest ? this.state.interest.value : "";
		let location = this.state.location ? this.state.location.value : "";

		this.search(interest, location);
		
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
								<Nav
									navStyle="tabs"
									activeKey={this.state.activeTab}
									onSelect={(eventKey, event) => {
										this.setState({ activeTab: eventKey });
									}}
									style={{
										borderBottomColor: 'transparent' // Make a transparent bottom border
									}}
								>
									<NavItem eventKey={1}>Search</NavItem>
									<NavItem eventKey={2}>My List</NavItem>
								</Nav>
								<TabContent activeKey={this.state.activeTab}>
									<TabPane eventKey={1}>
										<div className="row">
											<form className="col-12" onSubmit={this.handleSubmit}>
												<div className="row">
													<div className="col-sm-5">
														<Select
															
															value={this.state.interest}
															placeholder="Search by interest"
															onChange={this.handleChangeInterest}
															options={this.state.interestOptions}
															name="interests"

														/>
													</div>
													<div className="col-sm-5">
														<Select
															value={this.state.location}
															placeholder="Search by location"
															onChange={this.handleChangeLocation}
															options={this.state.locationOptions}
															name="locations"

														/>
													</div>
													<div className="col-sm-2">
														<Button color="primary" type="submit">Search</Button>
													</div>
												</div>
											</form>
										</div>
										<div className="row">
											<div className="col">
												<ProfileList data={this.state.profile}/>
											</div>
										</div>
									</TabPane>
									<TabPane eventKey={2}>
										<SavedCandidatesList/>
									</TabPane>
								</TabContent>
							</div>
					</Sidebar>
				</div>
		);
	}
}