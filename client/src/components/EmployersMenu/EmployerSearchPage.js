import React, { Component } from "react";
import Sidebar from "react-sidebar";
import MaterialTitlePanel from "../AdminComponents/MaterialTitlePanel";
import SidebarContent from "../AdminComponents/MenuBar";
import EmployerList from "./EmployerList";

const mql = window.matchMedia("(min-width: 800px)");

export default class EmployerSearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mql: mql,
      docked: true,
      open: false,
      count: 0,
      user: null
    };
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}

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

  handleSubmit(event) {
    const self = this;
    event.preventDefault();
    const data = new FormData(event.target);

    var url = "/api/search/employers?" + "name=" + event.target.name.value;
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
          sidebar={sidebar}
          docked={this.state.docked}
          open={this.state.open}
          onSetOpen={this.onSetOpen}
        >
          <MaterialTitlePanel title={contentHeader}>
            <div className="container">
              <div className="row">
                <form className="col-12" onSubmit={this.handleSubmit}>
                  <div className="input-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control col-sm-8"
                      placeholder="Search for employees..."
                    />
                  </div>
                </form>
                <div className="row">
                  <div className="col">
                    <EmployerList data={this.state.profile} />
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
