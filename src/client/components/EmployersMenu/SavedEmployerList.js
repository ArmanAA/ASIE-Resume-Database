import React, { Component } from "react";
import ReactTable from "react-table";
import { Clickable, StopPropagation } from "react-clickable";
import "react-table/react-table.css";
import { Button } from 'reactstrap'

export default class SavedEmployerList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			profile: [],
			selected: {},
			selectAll: 0
		};
	}

	handleClick(employerId) {
		var currUrl = new URL(window.location.href);
		var url = "/api/employers/savedemployers/remove"
		fetch(url, {
			headers: {
				"Content-Type": "application/json"
			},
			method: 'POST',
			body: JSON.stringify({employerId: employerId}),
			credentials: 'include'
		}).then(response => {
			return response.json();
		}).then(result => {
			if(result.message === "successful") {
				let index = -1;
				let newProfile = this.state.profile || [];
				for (var i=0; i<newProfile.length; i++) {
					if (newProfile[i].id == employerId) {
						index = i;
						break;
					}
				}
				if (index > -1) {
					newProfile.splice(index, 1);
				}
				this.setState({
					profile: newProfile
				},
				this.props.updateList
				)
				
			}
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
				id: "removeButton",
				accessor: "",
				Cell: ({ original }) => {
					return (
						<Button color="danger" onClick={() => this.handleClick(original.id)}> Remove from MyList </Button>
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
								if(column.id != 'removeButton'){
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