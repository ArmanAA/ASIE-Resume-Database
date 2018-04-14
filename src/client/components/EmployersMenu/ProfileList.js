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
        window.location.reload();
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
            <div>
            {
              original.matched == true ? 
              <Button color="primary" onClick={() => this.handleClick(original.userId)} disabled={true}> Matched </Button>
              :
              <Button color="primary" onClick={() => this.handleClick(original.userId)}> Match </Button>
            }
            </div>
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
          return {
            onClick: (e, handleOriginal) => {
              if(rowInfo) {
                if(column.id != 'addButton'){
                  var url = '/candidate/' + rowInfo.original.userId;
                  window.open(url);
                }
              }
              if (handleOriginal) {
                handleOriginal();
              }
            }
          }
        }}
      />
    );
  }
}
