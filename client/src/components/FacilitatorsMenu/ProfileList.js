import React, { Component } from 'react';
import ReactTable from 'react-table';
import AddFacilitatorModal from './AddFacilitatorModal.js'
import './FacilitatorStyle.css';

export default class ProfileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: [],
      selected: {},
      selectAll: 0
    }
    this.toggleRow = this.toggleRow.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      console.log("ProfileList", nextProps.data);
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
    console.log(this.state.selected);
  }

  toggleSelectAll() {
    let newSelected = {};

    if (this.state.selectAll === 0) {
      this.state.profile.forEach(x => {
        newSelected[x.id] = true;
      });
    }

    this.setState({
      selected: newSelected,
      selectAll: this.state.selectAll === 0 ? 1 : 0
    });
  }

  handleDelete(event){
    console.log(Object.keys(this.state.selected));
      fetch("/api/facilitators/delete", {
      headers: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify(this.state.selected),
      credentials: 'include'
    }).then(response => {
      response.json().then(json => {
        window.location.href = "/facilitators";
      })
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
              checked={this.state.selected[original.id] === true}
              onChange={() => this.toggleRow(original.id)}
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
      }
    ]
    return (
      <div>

      <AddFacilitatorModal/>
       <input className="btn btn-outline-primary mb-2  mx-1" onClick={this.handleDelete} type="button" value="Delete Facilitator"/>
      
      <ReactTable
        data={this.state.profile}
        columns={columns}
        defaultPageSize={10}
        className="-striped -highlight"
        getTdProps={(state, rowInfo, column, instance) => {
          return {onClick: e =>{
            //console.log(column);
            if(column.id != 'checkbox'){
              var url = '/facilitator?id=' + rowInfo.original.id;
              window.location.href = url;
          }
        }}
        }}
       
      /></div>
    );
  }
}
