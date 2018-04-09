import React, { Component } from 'react';

const labelStyle ={
	fontWeight: "bold"
}

export default class Skills extends Component {
	constructor(props) {
		super(props)
		this.state = {
			disabilities: props.data || []
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({disabilities: nextProps.data});
	}

	render() {
		if(this.state.disabilities) {
			var disabilities = this.state.disabilities.map((disability) => {
				return <li key={disability}>{disability}</li>
			});
		}
		return (
			!this.state.disabilities || this.state.disabilities.length === 0 ?
				<span></span>
			:
				<div className="row">
					<div className="col-3 section-title">
						<h1><span>Additional Information</span></h1>
					</div>
					<div className="col-10 section">
						<label style={labelStyle}>I have the following conditions:</label><br/>
						<ul>
							{disabilities}
						</ul>
					</div>
				</div>
		);
	}
}