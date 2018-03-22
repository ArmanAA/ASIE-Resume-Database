import React, {Component} from 'react';
import './profile.css';
import CommentBox from './CommentBox.js';
import {Collapse} from 'react-collapse';

export default class ProfileComponent extends Component {
	
	constructor(props, context){
		super(props, context);
		this.state = {
			notesOpen: true,
			historyOpen: false
		};
		this.toggleNotesOpen = this.toggleNotesOpen.bind(this);
		this.toggleHistoryOpen = this.toggleHistoryOpen.bind(this);
    
	}


 	toggleNotesOpen(ev) {
	    this.setState( {notesOpen: !this.state.notesOpen});
	    if (ev) {
	      ev.preventDefault();
	    }
	    console.log(this.state);
	  }


 	toggleHistoryOpen(ev) {
	    this.setState({ historyOpen: !this.state.historyOpen});
	    if (ev) {
	      ev.preventDefault();
	    }
	    console.log(this.state);
	  }

	componentDidMount() {
  		document.title="Employer Profile"; //Change to employer message subject?
  	}

	render(){

		var name = 'Very Very Long Name To Fit';
		var email = 'email@email.com';
		var subject = 'Subject of the email';
		var message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
		var status = false;
		var inList = false;
		var date="Jan 22 1919";
//  <CommentBox data={commentData} />,


		return(
			<div className="container-fluid mx-auto profile">
			<div className="row border rounded">
				<div className="col-12 mx-auto " id="employer-id">
					<div className="row justify-content-between">
						<div className="col-5 name">
							<h2>{name}</h2>
							<p> {email}</p>
						</div>
						<div className="col-lg-3 col-sm-5 col-md-5 buttons">
							<div className="row justify-content-between">
							<div className="col-12 box">
								<button className=" badge badge-pill badge-info float-right"> Remove from MyList </button>
								<button className=" badge badge-pill badge-info float-right"> Archive </button>
							</div>
							<div className="col-12 box">
								<span className="badge badge-primary float-right">STATUS </span>
								<span className="badge badge-primary float-right">IN MYLIST </span>
								
							</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-12 mx-auto " id="employer-msg">
					<div className="row border">
						<div className="col-9  subject rounded">
							<h1>{subject}</h1>
						</div>
						<div className="col-3 date">
							<h6>{date}</h6>
						</div>
						<div className="col-12 border-top msg ">
							<p>{message}</p>
						</div>
					</div>

				</div>
				<div className="col-6  " id="notes">
					<div className="row">
						<div className="col-12 border sec-title">
							<h6 onClick={this.toggleNotesOpen.bind(this)}> Notes</h6>
						</div>
						<div className="col-12 border" >
							<Collapse isOpened={this.state.notesOpen}>
								<CommentBox />
							</Collapse>
						</div>
						<div className="col-12 border sec-title">
							<h6>History</h6>
						</div>
					</div>
				</div>
				<div className="col-6" id="search-cand">
					<div className="row">
						<div className="col-12 border sec-title">
							<h6>Search Candidate</h6>
						</div>
						
						<div className="col-12 border">
							{/*Lot of buttons to come here*/}
						</div>
					</div>
				</div>
			</div>
			</div>
		);
	}
}

