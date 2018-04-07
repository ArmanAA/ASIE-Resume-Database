import React, { Component } from 'react';

export default class BasicInformation extends Component {
	constructor() {
	    super()
	    this.state = {
	    	conditions: [
	    		"Autism",
	    		"Cerebral Palsy",
	    		"Developmental Disability",
	    		"Epilepsy",
	    		"Intellectual Disability"
	    	]
	    }
	}

	render() {
    	if (this.state.conditions) {
    		var condition_options = this.state.conditions.map((option) => {
    			return <div key={option}>
    					<label><input type="checkbox" name="conditions" value={option}/>{option}</label>
    				</div>
    		});
    	}

	    return (
	    	<div>
	    		<h1>Basic Information</h1>

	    		<h2>Would you like to upload your profile picture?</h2>
	    		<input type="file" name="profilepic" accept="image/*"/>

	    		<h2>Are you over the age of 18 years old?</h2>
	    		<label><input type="radio" name="age" value="yes"/> Yes</label>
		    	<label><input type="radio" name="age" value="no"/> No</label>

		    	<h2>Do you have any of these conditions?</h2>
		    	{condition_options}
	    	</div>
	    );
	}
}