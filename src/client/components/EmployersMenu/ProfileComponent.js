import React, { Component } from "react";
import "./profile.css";
import CommentBox from "./CommentBox.js";
import { Collapse } from "react-collapse";
import SearchPotentialCandidatesModal from "./modal/SearchPotentialCandidatesModal";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SearchPage from './SearchPage';

export default class ProfileComponent extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			notesOpen: true,
			searchpotentialcandidates: false,
			addCandidatesModal: false
		};
		this.addRemoveToMyList = this.addRemoveToMyList.bind(this);
		this.toggleNotesOpen = this.toggleNotesOpen.bind(this);
		this.searchForCandidates = this.searchForCandidates.bind(this);
		this.toggleAddCandidatesModal = this.toggleAddCandidatesModal.bind(this);
		this.deleteMatch = this.deleteMatch.bind(this);
	}

	toggleAddCandidatesModal() {
		this.setState({addCandidatesModal: !this.state.addCandidatesModal});
	}

	toggleNotesOpen(ev) {
		this.setState({ notesOpen: !this.state.notesOpen });
		if (ev) {
			ev.preventDefault();
		}
	}


	componentDidMount() {
		var currUrl = new URL(window.location.href);
		var url = "/api/search/employer/profile/" + currUrl.searchParams.get("id");
		this.callApi(url, "employer");
		document.title = "Employer Profile"; //Change to employer message subject?

		var addedCandidatesUrl = "/api/employers/profile/" + currUrl.searchParams.get("id") + "/matches"; 
		this.callApi(addedCandidatesUrl, "addedCandidates");

		const self = this;
		var url = "/api/employers/savedemployers/inmylist/"+currUrl.searchParams.get("id");
		fetch(url, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			credentials: "include"
		}).then(response => {
			response.json().then(json => {
				if (json) {
					self.setState({ inMyList: json.inMyList });
				}
			});
		});
	}

	deleteMatch(match_id, entry_id) {
		fetch("/api/employers/profile/" + match_id + "/remove", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include"
		}).then(response => {
			return response.json()
		}).then(result => {
			if(result.message === "successful") {
				let matches = this.state.addedCandidates || [];
				if (entry_id > -1) {
					matches.splice(entry_id, 1);
				}
				this.setState({addedCandidates: matches});
			}
		})
	}

	callApi = async (url, employer) => {
		const response = await fetch(url, { credentials: "include" });
		const body = await response.json();

		if (response.status !== 200) throw Error(body.message);
		this.setState({ [employer]: body });
	};

	addRemoveToMyList() {
		this.setState({ inMyList: !this.state.inMyList });
		if (!this.state.inMyList) {
			var currUrl = new URL(window.location.href);
			var url = "/api/employers/savedemployers/save"
			fetch(url, {
				headers: {
					"Content-Type": "application/json"
				},
				method: 'POST',
				body: JSON.stringify({employerId: currUrl.searchParams.get("id")}),
				credentials: 'include'
			}).then(response => {
				return response.json();
			});
		} else {
			var currUrl = new URL(window.location.href);
			var url = "/api/employers/savedemployers/remove"
			fetch(url, {
				headers: {
					"Content-Type": "application/json"
				},
				method: 'POST',
				body: JSON.stringify({employerId: currUrl.searchParams.get("id")}),
				credentials: 'include'
			}).then(response => {
				return response.json();
			});
		}
	}
	searchForCandidates() {
		this.setState({ searchpotentialcandidates: true });
	}
	render() {
		if (this.state.employer) {
			var name =
				this.state.employer.firstName + " " + this.state.employer.lastName;
			var email = this.state.employer.email;
			var subject = this.state.employer.subject;
			var message = this.state.employer.message;
			var status = false;
			var inList = false;
			var date = this.state.employer.createdAt.slice(0,10);
		}

		if (this.state.addedCandidates) {
			var candidatesList = this.state.addedCandidates.map((item, entry_id) => {
				return <div className="row">
							<div className="col">
							<hr/>
								<div className="row">
									<h5 className="col-8">
										{item.candidate.name}
									</h5>
									<div className="col-4">
										<Button onClick={() => this.deleteMatch(item.match, entry_id)} color="danger">Remove</Button>
									</div>
								</div>
								<div className="row">
									<h6 className="col-12">
										Added By {item.facilitator}
									</h6>
								</div>
							<hr/>
							</div> 
						</div>
			});
		}

		//  <CommentBox data={commentData} />,

		return (
			<div className="container-fluid">
				<div className="row mt-4 profile border rounded">
					<div className="col-12" id="employer-id">
						<div className="row mt-2 mb-2">
							<div className="col-lg-9">
								<div className="row">
									<div className="col-12">
										<h2>{name}</h2>
									</div>
								</div>
								<div className="row">
									<div className="col-12">
										<p>{email}</p>
									</div>
								</div>
							</div>
							<div className="col-lg-3">
								<Button color="info" onClick={this.addRemoveToMyList}>
									{this.state.inMyList ? (
										<span> Remove From My List</span>
									) : (
										<span>Add to My List</span>
									)}
								</Button>
							</div>
						</div>
						<div className="row border">
							<div className="col-12">
								<div className="row mt-2 mb-2">
									<div className="col-9">
										<h4>{subject}</h4>
									</div>
									<div className="col-3">
										<h5>{date}</h5>
									</div>
								</div>
							<div>
						</div>
					</div>
				</div>
				<div className="row border">
					<div className="col-12">
						<div className="row">
							<div className="col-12">
								<p className="message">{message}</p>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-6 border" id="notes">
						<h6 className="mt-2 mb-2">Notes</h6>
					</div>
					<div className="col-6 border" id="search-cand">
						<h6 className="mt-2 mb-2">Search Candidate</h6>
					</div>
				</div>
				<div className="row">
					<div className="col-6 border commentScroll" id="notes">
						<CommentBox />
					</div>
					<div className="col-6 border" id="search-cand">
						<div className="row">
							<Button className="col-12" onClick={this.toggleAddCandidatesModal}>Add Potential Candidates</Button>
							<Modal isOpen={this.state.addCandidatesModal} toggle={this.toggleAddCandidatesModal}>
								<SearchPage />
							</Modal>
						</div>
						{ candidatesList }
					</div>
				</div>
			</div>	
			</div>
			</div>
		);
	}
}