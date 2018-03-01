import React, { Component } from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'

export default class Interests extends Component {
	constructor() {
	    super()
	    this.state = {tags: []}
	}

	handleChange(tags) {
    	this.setState({tags})
	}

	render() {
	    return (
	    	<div className="row">
				<div className="three columns header-col">
					<h1><span>Interests</span></h1>
				</div>
				<div className="nine columns main-col info-box">
					<TagsInput
						value={this.state.tags}
						onChange={this.handleChange.bind(this)}
						inputProps={{className: 'react-tagsinput-input',  placeholder: 'Enter interests'}}
					/>
				</div>
			</div>
	    );
	}
}