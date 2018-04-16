import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import {Button} from 'reactstrap';

export default class ProfileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: [],
      selected: {},
      selectAll: 0
    }
    this.toggleRow = this.toggleRow.bind(this);
  }

  handleClick(entryId) {
    fetch('/api/folders/remove', {
      headers: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify({entryId: entryId}),
      credentials: 'include'
    }).then(response => {
      return response.json();
    }).then(result => {
      if(result.message === "successful") {
        let index = -1;
        let newProfile = this.state.profile || [];
        for (var i=0; i<newProfile.length; i++) {
          if (newProfile[i].entryId == entryId) {
            index = i;
            break;
          }
        }
        if (index > -1) {
          newProfile.splice(index, 1);
        }
        this.setState({
          profile: newProfile
        });
        this.props.updateCount(entryId);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({
        profile: nextProps.data
      })
    }

  }

  toggleRow(id) {
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[id] = !this.state.selected[id];
    this.setState({
      selected: newSelected,
      selectAll: 2
    });
  }

  toggleSelectAll() {
    let newSelected = {};

    if (this.state.selectAll === 0) {
      this.state.profile.forEach(x => {
        newSelected[x.userId] = true;
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
        id: "removeButton",
        accessor: "",
        Cell: ({ original }) => {
          return (
            <Button color="danger" onClick={() => this.handleClick(original.entryId)}> Remove </Button>
          );
        },
        style: { textAlign: 'center' }
      },
      {
        id: "pic",
        accessor: "",
        Cell: ({ original }) => {
          return (
            <img src={ "/profile/" + original.profilepic } align="middle" width="80" height="80"  />
          );
        },
        Header: '',
        sortable: false,
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

    ]
    return (
      <ReactTable
        data={this.state.profile}
        columns={columns}
        defaultPageSize={10}
        className="-striped -highlight"
        getTdProps={(state, rowInfo, column, instance) => {
          return {
            onClick: (e, handleOriginal) => {
              if(rowInfo) {
                if(column.id != 'removeButton'){
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
