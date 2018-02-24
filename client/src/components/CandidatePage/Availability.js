import React, { Component } from 'react';

export default class Availability extends Component {
	render() {
	    return (
	    	<div className="row">
				<div className="three columns header-col">
					<h1><span>Availability</span></h1>
				</div>
				<div className="nine columns main-col">
					<form>
						<label><input type="checkbox" name="sunday"/> Sunday</label>
						<label><input type="checkbox" name="monday"/> Monday</label>
						<label><input type="checkbox" name="tuesday"/> Tuesday</label>
						<label><input type="checkbox" name="wednesday"/> Wednesday</label>
						<label><input type="checkbox" name="thursday"/> Thursday</label>
						<label><input type="checkbox" name="friday"/> Friday</label>
						<label><input type="checkbox" name="saturday"/> Saturday</label>
						<label><input type="checkbox" name="morning"/> Morning</label>
						<label><input type="checkbox" name="afternoon"/> Afternoon</label>
						<label><input type="checkbox" name="evening"/> Evening</label>
						<label> Hours <input type="text" name="hours"/></label>
					</form>
				</div>
			</div>
	    );
	}
}