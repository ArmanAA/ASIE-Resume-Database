import React, { Component } from "react";
import ReactTable from "react-table";
import { Clickable, StopPropagation } from "react-clickable";
import "react-table/react-table.css";
import { Button } from 'reactstrap'

export default class EmployerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: [],
      selected: {},
      selectAll: 0
    };
  }

  handleClick(employerId) {
    var url = "/api/employers/savedemployers/save"
    fetch(url, {
      headers: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify({employerId: employerId}),
      credentials: 'include'
    }).then(response => {
      response.json().then(json => {
        window.location.reload();
      })
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({
        profile: nextProps.data
      });
    }
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
              original.inMyList == true ?
               <Button color="primary" disabled={original.inMyList}> Already in MyList </Button>
              :
                <Button color="primary" onClick={() => this.handleClick(original.id)}> Add to MyList </Button>
            }
            </div>
          );
        },
        style: { textAlign: 'center' }
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
      },
      {
        Header: "ID",
        accessor: "id",
        style: { textAlign: "center" },
        show: false
      },
      {
        Header: "Message",
        accessor: "message",
        style: { textAlign: "center" },
        show: false
      }
    ];

    return (
      <ReactTable
        getTdProps={(state, rowInfo, column, instance) => {
          return {
            onClick: (e, handleOriginal) => {
              if(rowInfo) {
                if(column.id != 'addButton'){
                  var url = "/tempemp?id=" + rowInfo.original.id
                  window.open(url);
                }
              }
              if (handleOriginal) {
                handleOriginal();
              }
            }
          };
        }}
        data={this.state.profile}
        columns={columns}
        defaultPageSize={10}
        className="-striped -highlight"
      />
    );
  }
}