import React, { Component } from "react";
import "./profile.css";
import CommentBox from "./CommentBox.js";
import { Collapse } from "react-collapse";
import SearchPotentialCandidatesModal from "./modal/SearchPotentialCandidatesModal";
import Modal from "react-responsive-modal";

export default class ProfileComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      notesOpen: true,
      historyOpen: false,
      inMyList: false,
      searchpotentialcandidates: false
    };
    this.addRemoveToMyList = this.addRemoveToMyList.bind(this);
    this.toggleNotesOpen = this.toggleNotesOpen.bind(this);
    this.toggleHistoryOpen = this.toggleHistoryOpen.bind(this);
    this.searchForCandidates = this.searchForCandidates.bind(this);
  }

  toggleNotesOpen(ev) {
    this.setState({ notesOpen: !this.state.notesOpen });
    if (ev) {
      ev.preventDefault();
    }
    console.log(this.state);
  }

  toggleHistoryOpen(ev) {
    this.setState({ historyOpen: !this.state.historyOpen });
    if (ev) {
      ev.preventDefault();
    }
    console.log(this.state);
  }

  componentDidMount() {
    var currUrl = new URL(window.location.href);
    var url = "/api/search/employer/profile/" + currUrl.searchParams.get("id");
    this.callApi(url, "employer");
    document.title = "Employer Profile"; //Change to employer message subject?
  }

  callApi = async (url, employer) => {
    const response = await fetch(url, { credentials: "include" });
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    //console.log(body);
    this.setState({ employer: body });
  };

  addRemoveToMyList() {
    this.setState({ inMyList: !this.state.inMyList });
    if (this.state.inMyList) {
      var currUrl = new URL(window.location.href);
      var removeurl = "/api/removeemployer/" + currUrl.searchParams.get("id");
      this.callApi(removeurl, "facilitatorsemployerlists");
    } else {
      var currUrl = new URL(window.location.href);
      var addurl = "/api/addemployer/" + currUrl.searchParams.get("id");
      this.callApi(addurl, "facilitatorsemployerlists");
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
      var date = "Jan 22 1919";
    }

    //  <CommentBox data={commentData} />,

    return (
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
                    <button
                      className=" badge badge-pill badge-info float-right"
                      onClick={this.addRemoveToMyList}
                    >
                      {this.state.inMyList ? (
                        <span> Remove From My List</span>
                      ) : (
                        <span>Add to My List</span>
                      )}
                    </button>
                    <button className=" badge badge-pill badge-info float-right">
                      {" "}
                      Archive{" "}
                    </button>
                    <button
                      className=" badge badge-pill badge-info float-right"
                      onClick={this.searchForCandidates}
                    >
                      Search for Potential Candidates for This Employer
                    </button>
                    <Modal
                      open={this.state.searchpotentialcandidates}
                      onClose={() => {
                        this.setState({ searchpotentialcandidates: false });
                      }}
                    >
                      <SearchPotentialCandidatesModal />
                    </Modal>
                  </div>
                  <div className="col-12 box">
                    <span className="badge badge-primary float-right">
                      STATUS{" "}
                    </span>
                    <span className="badge badge-primary float-right">
                      IN MY LIST{" "}
                    </span>
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
              <div className="col-12 border">
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
                <div className="row">
                  <button>Add</button>
                </div>
                {/*Lot of buttons to come here*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}