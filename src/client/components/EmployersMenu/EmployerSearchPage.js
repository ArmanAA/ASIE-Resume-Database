import React, { Component } from "react";
import Sidebar from "react-sidebar";
import MaterialTitlePanel from "../AdminComponents/MaterialTitlePanel";
import SidebarContent from "../AdminComponents/MenuBar";
import EmployerList from "./EmployerList";
import SavedEmployerList from "./SavedEmployerList";
import { Button, Navbar, NavbarToggler } from 'reactstrap';
import {
    Nav,
    NavItem,
    NavDropdown, // optional
    MenuItem, // optional
    TabContent,
    TabPane
} from '@trendmicro/react-navs';

const mql = window.matchMedia("(min-width: 768px)");

export default class EmployerSearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mql: mql,
      docked: true,
      open: false,
      count: 0,
      user: null,
      activeTab: 1
    };
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.search = this.search.bind(this);
    this.getSaved = this.getSaved.bind(this);
  }

  componentDidMount() {
    // populate search table when page loads
    this.search("");
    this.getSaved();
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
    this.setState({ mql: mql, docked: mql.matches });
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  onSetOpen(open) {
    this.setState({ open: open });
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

  getSaved() {
    const self = this;
    fetch("/api/employers/savedemployers", {
      method: "GET",
      credentials: "include"
    }).then(response => {
      console.log(response);
      response.json().then(json => {
        if (json) {
          self.setState({ saved: json });
        }
      });
    });
  }

  updateList() {
    this.search("");
  }


  search(name) {
    const self = this;
    var url = "/api/search/employer?" + "name=" + name;
    fetch(url, {
      method: "GET",
      credentials: "include"
    }).then(response => {
      response.json().then(json => {
        console.log("EmployerSearchPage", json);
        if (json) {
          self.setState({ profile: json });
        }
      });
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    this.search(event.target.name.value);
  }

  render() {
    const sidebar = <SidebarContent />;

    const contentHeader = (
      <span>
        {!this.state.docked && (
          <button onClick={this.toggleOpen.bind(this)}>=</button>
        )}
        <span />
      </span>
    );
    return (
      <div style={{ backgroundColor: "#111" }}>
        <Sidebar
          sidebar={sidebar} docked={this.state.docked} open={this.state.open} onSetOpen={this.onSetOpen}>
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
                        <div className="input-group">
                          <input
                            type="text"
                            name="name"
                            className="form-control col-sm-10 rounded"
                            placeholder="Search for employers by name, by email, and/or subject"
                          />
                         <input className="btn btn-primary mb-2 col-sm-2 mx-1" type="submit" value="Search"/>
                        </div>
                      </form>

                      <div className="row mb-5">
                        <div className="col">
                          <EmployerList data={this.state.profile} />
                        </div>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane eventKey={2}>
                    <SavedEmployerList data={this.state.saved} updateList={this.updateList.bind(this)}/>
                  </TabPane>
                </TabContent>
            </div>
        </Sidebar>
      </div>
    );
  }
}