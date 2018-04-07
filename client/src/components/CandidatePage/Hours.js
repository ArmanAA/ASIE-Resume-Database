import React, { Component } from 'react';

const labelStyle ={
	fontWeight: "bold"
}

export default class Hours extends Component {
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
			var days = this.state.data.days;
			var times = this.state.data.times;
			var sunday = days.includes("Sunday");
			var monday = days.includes("Monday");
			var tuesday = days.includes("Tuesday");
			var wednesday = days.includes("Wednesday");
			var thursday = days.includes("Thursday");
			var friday = days.includes("Friday");
			var saturday = days.includes("Saturday");

			var morning = times.includes("Morning");
			var afternoon = times.includes("Afternoon");
			var evening = times.includes("Evening");
			var hours = this.state.data.hours;
		}



		return (
			(!this.state.data || this.state.data.days.length === 0) &&
			(!this.state.data || this.state.data.days.length === 0) &&
			(!this.state.data || !this.state.data.hours) ?
				<span></span>
			:
				<div className="row">
					<div className="col-3 section-title">
						<h1>Hours</h1>
					</div>
					<div className="section col-10">
						{
							days.length == 0 ? <span></span> : 
							<div>
								<label style={labelStyle}>Days Available</label><br/>
								<label><input type="checkbox" name="sunday" checked={sunday}/> Sunday</label>
								<label><input type="checkbox" name="monday" checked={monday}/> Monday</label>
								<label><input type="checkbox" name="tuesday" checked={tuesday}/> Tuesday</label>
								<label><input type="checkbox" name="wednesday" checked={wednesday}/> Wednesday</label>
								<label><input type="checkbox" name="thursday" checked={thursday}/> Thursday</label>
								<label><input type="checkbox" name="friday" checked={friday}/> Friday</label>
								<label><input type="checkbox" name="saturday" checked={saturday}/> Saturday</label>
								<br/>
							</div>
						}
						{
							times.length == 0 ? <span></span> :
							<div>
								<label style={labelStyle}>Times Available</label><br/>
								<label><input type="checkbox" name="morning" checked={morning}/> Morning</label>
								<label><input type="checkbox" name="afternoon" checked={afternoon}/> Afternoon</label>
								<label><input type="checkbox" name="evening" checked={evening}/> Evening</label>
								<br/>
							</div>
						}
						{
							!hours ? <span></span> :
							<div>
								<label style={labelStyle}>Hours willing to work per week: </label><br/>
								<label>{hours} hours</label>
							</div>
							
						}
					</div>
				</div>
		);
	}
}