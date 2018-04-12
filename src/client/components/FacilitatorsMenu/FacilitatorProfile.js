import React, {Component} from 'react';
import {Collapse, Button, Card, CardBody} from 'reactstrap';
import qs from 'query-string';
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
				registerDate: ''
			};

		const self = this;
		var query = qs.parse(props.location.search);
		fetch('/api/facilitators/profile/' + query.id, {
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
		document.title="Facilitator Profile"; 
	}


	render(){

		const sidebar = <SidebarContent />;
		const contentHeader = (
					<span>
						{!this.state.docked &&
						 <button className="btn-toggle-menu" onClick={this.toggleOpen.bind(this)}>=</button>}
						<span></span>
					</span>);

		const mylist = {
			count: 3,
			lists :
			[{
				listName: 'My list1', 
				listItems:[ {
					firstName: 'cand_firstname',
					lastName: 'cand_lastname',

				},
				{
					firstName: 'cand_firstname',
					lastName: 'cand_lastname',
				}

				]
			},
			{
				listName: 'My list2', 
				listItems: [{
					firstName: 'cand_firstname',
					lastName: 'cand_lastname',

				}]
			},
			{
				listName: 'My list3', 
				listItems: [{
					firstName: 'cand_firstname',
					lastName: 'cand_lastname',

				}]
			}]

		}
		var lists = mylist.lists;
		var MyLists = lists.map((item)=>
			<CollapseItem customClass={"mylists"}  list={item}/>
		);
		
		var message = `
			BODY\t  Facilitator Mylists\n
				\tCollapse\n
				\t\t	List1 \n
				\t\t	Employers \n
				\tCollapse \n
				\t\t	List2 \n
				\t\t	Employers \n
				\t\t	... `;
		
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
							<h1>My Lists</h1>
							
						</div>
						<div className="col-12 border-top msg ">
								{MyLists}
							</div>
						
						

						<div className="col-12 border subject rounded">
							<h1>Assigned Candidates</h1>
						</div>
						
						<div className="col-12 border-top msg ">
								<p>{message}</p>
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