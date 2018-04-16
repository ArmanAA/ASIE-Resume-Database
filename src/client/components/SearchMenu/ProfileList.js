import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

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
    var keys = Object.keys(newSelected);
    var ids = keys.filter(function(key) {
      return newSelected[key];
    })
    this.props.getSelectedRows(ids);
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
    var keys = Object.keys(newSelected);
    var ids = keys.filter(function(key) {
      return newSelected[key];
    })
    this.props.getSelectedRows(ids);
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
              checked={this.state.selected[original.userId] === true}
              onChange={() => this.toggleRow(original.userId)}
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
                if(column.id != 'checkbox'){
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
