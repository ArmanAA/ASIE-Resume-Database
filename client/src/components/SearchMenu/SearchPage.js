import React, { Component } from "react";
import Sidebar from "react-sidebar";
import MaterialTitlePanel from "../AdminComponents/MaterialTitlePanel";
import SidebarContent from "../AdminComponents/MenuBar";
import styles from "./SearchPage.css";
import ProfileList from "./ProfileList";
import "@trendmicro/react-navs/dist/react-navs.css";
import {
  Button,
  Form,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
// [Optional] Include react-dropdown.css when using NavDropdown
import "@trendmicro/react-dropdown/dist/react-dropdown.css";
import {
  Nav,
  NavItem,
  NavDropdown, // optional
  MenuItem, // optional
  TabContent,
  TabPane
} from "@trendmicro/react-navs";

const mql = window.matchMedia("(min-width: 800px)");

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mql: mql,
      docked: true,
      open: false,
      count: 0,
      user: null,
      profile: [],
      activeTab: 1,
      modal: false
    };

    this.toggleNewFolder = this.toggleNewFolder.bind(this);
    // populate table
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFolderSubmit = this.handleFolderSubmit.bind(this);
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
    this.setState({ mql: mql, docked: mql.matches });
    this.search("", "");
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  onSetOpen(open) {
    this.setState({ open: open });
  }
  toggleNewFolder() {
    this.setState({
      modal: !this.state.modal
    });
  }

  mediaQueryChanged() {
    this.setState({
      mql: mql,
      docked: this.state.mql.matches
    });
  }

  toggleOpen(ev) {
    this.setState({ open: true });

    if (ev) {
      ev.preventDefault();
    }
  }

  search(interest, location) {
    const self = this;
    var url =
      "/api/search/candidate?" +
      "interests=" +
      interest +
      "&locations=" +
      location;
    fetch(url, {
      method: "GET",
      credentials: "include"
    }).then(response => {
      response.json().then(json => {
        console.log("SearchPage", json);
        if (json) {
          self.setState({ profile: json });
        }
      });
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    this.search(event.target.interests.value, event.target.locations.value);
  }
  handleFolderSubmit(event) {
    alert("event.target.folderName");
    console.log("SUBMITTED");
    console.log(event.target.folderName);
    event.preventDefault();
    var data = new FormData(event.target.folderName);
    //data.append("data", event.);
    var url = "/api/folders/create";
    fetch(url, {
      method: "POST",
      credentials: "include",
      body: data
    }).then(response => {
      response.json().then(json => {});
    });
  }

  render() {
    const sidebar = <SidebarContent />;

    const contentHeader = (
      <span>
        {!this.state.docked && (
          <button
            className="btn-toggle-menu"
            onClick={this.toggleOpen.bind(this)}
          >
            =
          </button>
        )}
        <span />
      </span>
    );
    return (
      <div>
        <Sidebar
          sidebar={sidebar}
          docked={this.state.docked}
          open={this.state.open}
          onSetOpen={this.onSetOpen}
        >
          <MaterialTitlePanel title={contentHeader}>
            <div className="container">
              <Nav
                navStyle="light-tabs"
                activeKey={this.state.activeTab}
                justified={true}
                onSelect={(eventKey, event) => {
                  this.setState({ activeTab: eventKey });
                }}
              >
                <NavItem eventKey={1}>Search Candidates</NavItem>
                <NavItem eventKey={2}>Save Candidates</NavItem>
              </Nav>
              <TabContent activeKey={this.state.activeTab}>
                <TabPane eventKey={1}>
                  <div className="row">
                    <form className="col-12" onSubmit={this.handleSubmit}>
                      <div className="input-group">
                        <input
                          type="text"
                          name="interests"
                          className="form-control col-sm-8"
                          placeholder="Search by interests"
                        />
                        <input
                          type="text"
                          name="locations"
                          className="form-control col-sm-8"
                          placeholder="Search by locations"
                        />
                        <input
                          className="btn btn-default mb-2 col-sm-2 mx-1"
                          type="submit"
                          value="Search"
                        />
                      </div>
                    </form>
                  </div>
                  <div className="row">
                    <div className="col">
                      {<ProfileList data={this.state.profile} />}
                    </div>
                  </div>
                </TabPane>
                <TabPane eventKey={2}>
                  <div>
                    <Button color="primary" onClick={this.toggleNewFolder}>
                      Create New Folder
                    </Button>
                    <Form
                      render={({ handleFolderSubmit }) => (
                        <Modal
                          isOpen={this.state.modal}
                          toggle={this.toggleNewFolder}
                        >
                          <ModalHeader toggle={this.toggleNewFolder}>
                            Create New Folder
                          </ModalHeader>
                          <ModalBody>
                            <input type="text" name="folderName" />{" "}
                          </ModalBody>

                          <ModalFooter>
                            <Button
                              color="primary"
                              // onClick={this.handleFolderSubmit}
                              type="submit"
                            >
                              Create
                            </Button>{" "}
                            <Button
                              color="secondary"
                              onClick={this.toggleNewFolder}
                            >
                              Cancel
                            </Button>
                          </ModalFooter>
                        </Modal>
                      )}
                    />
                  </div>
                </TabPane>
              </TabContent>
            </div>
          </MaterialTitlePanel>
        </Sidebar>
      </div>
    );
  }
}
