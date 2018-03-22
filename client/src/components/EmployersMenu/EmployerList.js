import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class EmployerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: [],
      selected: {},
      selectAll: 0
    };
    this.toggleRow = this.toggleRow.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      console.log("EmployerList", nextProps.data);
      this.setState({
        profile: nextProps.data
      });
    }
  }

  toggleRow(firstName) {
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[firstName] = !this.state.selected[firstName];
    this.setState({
      selected: newSelected,
      selectAll: 2
    });
  }

  toggleSelectAll() {
    let newSelected = {};

    if (this.state.selectAll === 0) {
      this.state.profile.forEach(x => {
        newSelected[x.firstName] = true;
      });
    }

    this.setState({
      selected: newSelected,
      selectAll: this.state.selectAll === 0 ? 1 : 0
    });
  }

  render() {
    const columns = [
      {
        id: "checkbox",
        accessor: "",
        Cell: ({ original }) => {
          return (
            <input
              type="checkbox"
              className="checkbox"
              checked={this.state.selected[original.firstName] === true}
              onChange={() => this.toggleRow(original.firstName)}
            />
          );
        },
        Header: x => {
          return (
            <input
              type="checkbox"
              className="checkbox"
              checked={this.state.selectAll === 1}
              ref={input => {
                if (input) {
                  input.indeterminate = this.state.selectAll === 2;
                }
              }}
              onChange={() => this.toggleSelectAll()}
            />
          );
        },
        sortable: false,
        style: { textAlign: "center" }
      },
      {
        Header: "Email",
        accessor: "email",
        style: { textAlign: "center" }
      },
      {
        Header: "First Name",
        accessor: "firstName",
        style: { textAlign: "center" }
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        style: { textAlign: "center" }
      },
      {
        Header: "Subject",
        accessor: "subject",
        style: { textAlign: "center" }
      }
    ];
    return (
      <ReactTable
        data={this.state.profile}
        columns={columns}
        defaultPageSize={10}
        className="-striped -highlight"
      />
    );
  }
}
