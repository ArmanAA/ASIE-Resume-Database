import React, { Component } from 'react';
import "./css/candidate.css";

const labelStyle ={
	fontWeight: "bold"
}

export default class Education extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: props.data
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({data: nextProps.data});
	}

	render() {
		if(this.state.data) {
			var methods = this.state.data.methods;
			var car = methods.includes("Car");
			var bike = methods.includes("Bike");
			var metro = methods.includes("Metro");
			var walk = methods.includes("Walk");
			var other = this.state.data.other;
			var distance = this.state.data.distance;
		}
		return (
			(!this.state.data || this.state.data.methods.length === 0) &&
			(!this.state.data || !this.state.data.other) &&
			(!this.state.data || !this.state.data.distance) ?
				<span></span>
			:
			<div className="row">
				<div className="col-3 section-title">
					<h1>Transportation</h1>
				</div>
				<div className="section col-10">
					{
						methods.length == 0 ? <span></span> :
						<div>
							<label style={labelStyle}>Which methods of transportation are will you take?</label><br/>
							<label><input type="checkbox" name="car" checked={car}/> Car</label>
							<label><input type="checkbox" name="bike" checked={bike}/> Bike</label>
							<label><input type="checkbox" name="metro" checked={metro}/> Metro</label>
							<label><input type="checkbox" name="walk" checked={walk}/> Walk</label><br/>
						</div>
					}
					{
						!other ? <span></span> :
						<div>
							<label style={labelStyle}>Other methods of transportation:</label><br/>
							<label>{other}</label>
						</div>
					}
					{
						!distance ? <span></span> :
						<div>
							<label style={labelStyle}>How far are you willing to travel? (in miles)</label><br/>
							<label>{distance} miles</label>

						</div>
					}
					
				</div>
			</div>
		);
	}
}