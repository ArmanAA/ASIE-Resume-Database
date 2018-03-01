import React, { Component } from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'

export default class Skills extends Component {
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
					<h1><span>Skills</span></h1>
				</div>
				<div className="nine columns main-col info-box">
					<TagsInput
						value={this.state.tags}
						onChange={this.handleChange.bind(this)}
						inputProps={{className: 'react-tagsinput-input',  placeholder: 'Enter skills'}}
					/>
				</div>
			</div>
	    );
	}
}