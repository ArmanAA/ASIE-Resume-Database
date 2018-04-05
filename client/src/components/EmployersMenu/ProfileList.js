import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { Button } from 'reactstrap';

export default class ProfileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: [],
      selected: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      console.log("ProfileList", nextProps.data);
      this.setState({
        profile: nextProps.data
      })
    }

  }

  handleClick(candidateId) {
    var currUrl = new URL(window.location.href);
    var url =
      "/api/employers/profile/" +
      currUrl.searchParams.get("id") +
      "/add"
    fetch(url, {
      headers: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify({candidateId: candidateId}),
      credentials: 'include'
    }).then(response => {
      response.json().then(json => {
        
      })
    });
  }

  render() {
    const columns = [
      {
        id: "addButton",
        accessor: "",
        Cell: ({ original }) => {
          return (
            <Button color="primary" onClick={() => this.handleClick(original.userId)}> Add </Button>
          );
        },
        style: { textAlign: 'center' }
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
        style: { textAlign: 'center' }
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        style: { textAlign: 'center' }
      },
      {
        Header: 'Email',
        accessor: 'email',
        style: { textAlign: 'center' }
      },
      {
        Header: 'ID',
        accessor: 'userId',
        style: {textAlign: 'center'},
        show: false
      }

    ]
    return (
      <ReactTable
        data={this.state.profile}
        columns={columns}
        defaultPageSize={10}
        className="-striped -highlight"
        getTdProps={(State, rowInfo, column, instance) => {
          return {onClick: e => {
            if (column.id != 'addButton') {

            }
          }}
        }}
      />
    );
  }
}
