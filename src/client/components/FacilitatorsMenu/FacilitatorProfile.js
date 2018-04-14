import React, {Component} from 'react';
import {Collapse, Button, Card, CardBody, Table} from 'reactstrap';
import MaterialTitlePanel from '../AdminComponents/MaterialTitlePanel.js';
import SidebarContent from '../AdminComponents/MenuBar.js';
import Sidebar from 'react-sidebar';
import AccountBar from '../AccountBar';
import CollapseItem from './CollapseComponent.js';

const mql = window.matchMedia('(min-width: 800px)');


export default class FacilitatorProfile extends Component{
	constructor(props, context){
		super(props, context);

		this.state = {
				mql: mql,
				docked: true,
				open: false,
				notesOpen: false,
				firstname: '',
				lastname: '',
				email: '',
				registerDate: '',
				list: [],
				matches: []
			};

		const self = this;
		//console.log( currUrl.searchParams.getAll());
		fetch('/api/facilitators/profile/' + this.props.match.params.id, {
			headers: {"Content-Type": "application/json"},
			method: 'GET',
			credentials: 'include'
		}).then(response =>{
			response.json().then(json =>{
				if(json.lastOnline == null){
					json.lastOnline = "Never";
				}
				this.setState({
					firstname: json.firstName,
					lastname: json.lastName, 
					email: json.email,
					lastOnline: json.lastOnline.slice(0,10),
					registerDate: json.createdAt.slice(0,10)
				});
			})
		});

		fetch('/api/folders/' + this.props.match.params.id, {
			method: 'GET',
			credentials: 'include'
		}).then(res => {
			return res.json();
		}).then(json => {
			this.setState({
				list: json
			});
		});

		fetch('/api/facilitators/match/' + this.props.match.params.id, {
			method: 'GET',
			credentials: 'include'
		}).then(res => {
			return res.json();
		}).then(json => {
			this.setState({
				matches: json
			})
		});

		this.toggleOpen = this.toggleOpen.bind(this);
		this.onSetOpen = this.onSetOpen.bind(this);
		this.toggleNotesOpen = this.toggleNotesOpen.bind(this);
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


	toggleNotesOpen(ev) {
		this.setState( {notesOpen: !this.state.notesOpen});
		if (ev) {
			ev.preventDefault();
		}
	}


	componentDidMount() {
		document.title= "Facilitator Profile"; 
	}


	render(){

		const sidebar = <SidebarContent />;
		const contentHeader = (
					<span>
						{!this.state.docked &&
						 <button className="btn-toggle-menu" onClick={this.toggleOpen.bind(this)}>=</button>}
						<span></span>
					</span>);
		

		var lists = this.state.list;
		var MyLists = lists.map((item)=>
			<CollapseItem customClass={"mylists"}  list={item}/>
		);
		
		var matchtb = this.state.matches.map((item)=>
			<tr>
				<th scope="row"> </th>
				<td> <a href={"/candidate/" + item.candidate.id}> {item.candidate.name} </a></td>
				<td> <a href={"/employer/?id=" + item.employer.id}> {item.employer.name} </a></td>
				<td> {item.date.slice(0,10)} </td>
			</tr>
		);

		return (
			<div>
			<Sidebar sidebar={sidebar} docked={this.state.docked} open={this.state.open} onSetOpen={this.onSetOpen}>
			<MaterialTitlePanel  title={contentHeader}>
			  <AccountBar />
			<div className="container-fluid mx-auto profile">
			<div className="row border rounded">
				<div className="col-12 mx-auto " id="employer-id">
					<div className="row justify-content-between">
						<div className="col-5 name">
							<h2>{this.state.firstname} {this.state.lastname}</h2>
							<p> {this.state.email}</p>
						</div>
						<div className="col-lg-3 col-sm-5 col-md-5 dates">
							<div className="row  h-90 p-3 justify-content-between">
							<div className="badge badge-pill badge-info"> Registered </div>
							<div className="col-12 my-auto border rounded">
								{this.state.registerDate}
							</div>
							<div className="badge badge-pill badge-info"> Last Online </div>
							<div className="col-12 my-auto border rounded">
								{this.state.lastOnline}
								
							</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-12 mx-auto " >
					<div className="row ">
						<div className="col-12 border  subject rounded">
							<h1>Saved Candidates</h1>
							
						</div>
						<div className="col-12 border-top msg ">
								{MyLists}
							</div>
						
						

						<div className="col-12 border subject rounded">
							<h1>Matches By {this.state.firstName} {this.state.lastName}</h1>
						</div>
						
						<div className="col-12 border-top msg ">
							<Table>
								<thead>
									<tr>
										<th> </th>
										<th> Candidate </th>
										<th> Employer </th>
										<th> Match Date </th>
									</tr>
								</thead>
								<tbody>
									{matchtb}
								</tbody>
							</Table>
						</div>
						
					</div>

				</div>
			</div>
			</div>
			</MaterialTitlePanel>
			</Sidebar>
			</div>
		);
	}
}