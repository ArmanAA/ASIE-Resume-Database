import React, { Component } from 'react';

export default class Availability extends Component {
	render() {
	    return (
	    	<div className="row">
				<div className="three columns header-col">
					<h1><span>Availability</span></h1>
				</div>
				<div className="nine columns main-col info-box">
					<form className="form-group">
						<div className="checkboxes">
						<label><input type="checkbox" name="sunday"/> Sunday</label>
						<label><input type="checkbox" name="monday"/> Monday</label>
						<label><input type="checkbox" name="tuesday"/> Tuesday</label>
						<label><input type="checkbox" name="wednesday"/> Wednesday</label>
						<label><input type="checkbox" name="thursday"/> Thursday</label>
						<label><input type="checkbox" name="friday"/> Friday</label>
						<label><input type="checkbox" name="saturday"/> Saturday</label>
						</div>
						<div className="checkboxes">
						<label><input type="checkbox" name="morning"/> Morning</label>
						<label><input type="checkbox" name="afternoon"/> Afternoon</label>
						<label><input type="checkbox" name="evening"/> Evening</label>
						</div>
						<label> Hours <input className="form-control" type="text" name="hours"/></label>
					</form>
				</div>
			</div>
	    );
	}
}