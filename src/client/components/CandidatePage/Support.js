import React, { Component } from 'react';

const labelStyle ={
	fontWeight: "bold"
}

export default class Support extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: null,
			relationship: null,
			email: null,
			phone: null
		}
		this.componentWillReceiveProps(props);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.data) {
			this.setState({
				name: nextProps.data.name,
				relationship: nextProps.data.relationship,
				email: nextProps.data.email,
				phone: nextProps.data.phone
			})
		}
	}


	render() {
		return (
			this.state.name || this.state.relationship || this.state.email || this.state.phone  ?
			
			<div className="row">
				<div className="col-6 section-title">
					<h1><span>Support Contact Information</span></h1>
				</div>
				<div className="col-10 section">
					{
						!this.state.name ? 
							<span></span>
						:
							<div className="row">
								<label className="col-md-3" style={labelStyle}>Name:</label>
								<p className="col-md-9">{this.state.name}</p>
							</div>
					}
					{
						!this.state.relationship ? 
							<span></span>
						:
							<div className="row">
								<label className="col-md-3" style={labelStyle}>Relationship: </label>
								<p className="col-md-9">{this.state.relationship}</p>
								<br/>
							</div>
					}
					{	
						!this.state.email ? 
							<span></span>
						:
							<div className="row">
								<label className="col-md-3" style={labelStyle}>Email: </label>
								<p className="col-md-9">{this.state.email}</p>
								<br/>
							</div>
					}
					{
						!this.state.phone ? 
							<span></span>
						:
							<div className="row">
								<label className="col-md-3" style={labelStyle}>Phone Number: </label>
								<p className="col-md-9">{this.state.phone}</p>
								<br/>
							</div>
					}
					
					
				</div>
			</div>

			:
			<span></span>
		);
	}
}