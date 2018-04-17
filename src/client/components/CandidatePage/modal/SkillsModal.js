import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'
import "../../MenuBar.css";
import FaHelp from 'react-icons/lib/fa/question-circle-o';
import { Tooltip } from 'reactstrap';

const styles = {
	fontFamily: "sans-serif",
	textAlign: "center"
};

export default class SkillsModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			centered: true,
			skills: props.data,
			id: props.id,
			disabled: true,
			tooltipOpen: false
		};

		this.toggle = this.toggle.bind(this);
		this.toggleTooltip = this.toggleTooltip.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.data) {
			this.setState({
				skills: nextProps.data
			})
		}
	}

	updateData(type, skill) {
		fetch('/api/candidates/skills/' + this.state.id + '/update', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({type: type, skill: skill}),
			credentials: 'include'
		});
	}

	handleAdd(item) {
		this.updateData("add", item);
	}

	handleRemove(item) {
		this.updateData("remove", item);
	}

	handleChange(tags, changed, changedIndexes) {
		this.setState({skills: tags});
		//added
		for(var i=0; i<changed.length; i++) {
			if(tags[changedIndexes[i]] === changed[i]) {
				this.handleAdd(changed[i]);
			}
			else {
				this.handleRemove(changed[i]);
			}
		}
	}

	handleSubmit() {
		window.location.reload();
	}

	toggle() {
		this.setState({
			modal:!this.state.modal
		});
	}

	toggleTooltip() {
		this.setState({
			tooltipOpen: !this.state.tooltipOpen
		});
	}

	render() {
		return (
			!this.props.data ?
				<span></span>
			:
			<div style={styles}>
				<h2 className="Link" onClick={this.toggle}>+ Skills</h2>
				<Modal centered={this.state.centered} isOpen={this.state.modal} toggle={this.toggle}>
					<form onSubmit={this.handleSubmit}>
						<ModalHeader toggle={this.toggle}>
							
							<h2>Skills</h2>
							<p>Add some skills that you have such as "Microsoft Office Excel", "Detail-Oriented", "Website Design", etc.</p>
							<p>For more information about how to add a skill, put your cursor over <a href="#" id="help">here</a>.</p>
							
							<Tooltip placement="right" target="help" isOpen={this.state.tooltipOpen} toggle={this.toggleTooltip}> 
								To add a skill, type a skill that you want to add and press "enter key" to create a new tag. To delete a skill, click the "x" button next to the skill you want to delete. Once you are finished adding or removing skills, click "Submit Changes".
							</Tooltip>

						</ModalHeader>
						<ModalBody>
							
							<TagsInput
								value={this.state.skills}
								onChange={this.handleChange.bind(this)}
								onlyUnique={true}
								inputProps={{className: 'react-tagsinput-input',  placeholder: 'Enter skills'}}
							/>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={this.toggle} type="submit">Submit Changes</Button>{' '}
							<Button color="secondary" onClick={this.toggle}>Cancel</Button>
						</ModalFooter>
					</form>
				</Modal>
			</div>
		);
	}
}