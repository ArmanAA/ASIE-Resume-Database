import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'
import "../../MenuBar.css";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Tooltip } from 'reactstrap';

const styles = {
	fontFamily: "sans-serif",
	textAlign: "center"
};


export default class InterestModal extends Component {
	constructor(props) {
		super(props);

		if(props.data) {
			var personal_tags = props.data.personal_interest || [];
			var career_tags = props.data.career_interest || [];
		}

		this.state = {
			modal: false,
			id: props.id,
			centered: true,
			personal: personal_tags,
			career: career_tags,
			disabled: true,
			tooltipOpenPersonal: false,
			tooltipOpenCareer: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handlePersonal = this.handlePersonal.bind(this);
		this.handleCareer = this.handleCareer.bind(this);
		this.toggle = this.toggle.bind(this);
		this.toggleTooltipPersonal = this.toggleTooltipPersonal.bind(this);
		this.toggleTooltipCareer = this.toggleTooltipCareer.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.data) {
			this.setState({
				personal: nextProps.data.personal_interest,
				career: nextProps.data.career_interest
			});
		}
	}

	componentWillMount() {
		fetch('/api/candidates/interests/', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		}).then(res => {
			return res.json();
		}).then(json => {
			if (json) {
				this.setState({options: json});
			}
		})
	}

	updateData(action, type, interest) {
		console.log("POST", action, type, interest);
		fetch('/api/candidates/interests/' + this.state.id + '/update', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({action: action, type: type, interest: interest}),
			credentials: 'include'
		});
	}

	handleChange(type, tags, changed, changedIndexes) {
		console.log(type);
		console.log(tags);
		console.log(changed);
		console.log(changedIndexes);
		this.setState({[type]: tags});

		for(var i=0; i<changed.length; i++) {
			if(tags[changedIndexes[i]] === changed[i]) {
				console.log("interest - add");
				this.updateData("add", type, changed[i]);
			}
			else {
				console.log("interest - remove");
				this.updateData("remove", type, changed[i]);
			}
		}
	}

	handlePersonal(tags, changed, changedIndexes) {
		this.handleChange("personal", tags, changed, changedIndexes);
	}

	// handleCareer(tags, changed, changedIndexes) {
	// 	this.handleChange("career", tags, changed, changedIndexes);
	// }

	handleCareer(career) {
		let newCareer = [];
		for (var i=0; i<career.length; i++) {
			newCareer.push(career[i].value);
		}
		console.log("NEW", newCareer);
		console.log("OLD", this.state.career);
		let oldCareer = this.state.career;
		let removeCareer = oldCareer.filter(x => !newCareer.includes(x));
		console.log("REMOVE", removeCareer);
		let addCareer = newCareer.filter(x => !oldCareer.includes(x));
		console.log("ADD", addCareer);

		for (var i=0; i<removeCareer.length; i++) {
			this.updateData("remove", "career", removeCareer[i]);
		}
		for (var i=0; i<addCareer.length; i++) {
			this.updateData("add", "career", addCareer[i]);
		}
		this.setState({career: newCareer});
	}

	handleSubmit() {
		window.location.reload();
	}

	toggle() {
		this.setState({
			modal:!this.state.modal
		});
	}

	toggleTooltipPersonal() {
		this.setState({
			tooltipOpenPersonal: !this.state.tooltipOpenPersonal
		});
	}

	toggleTooltipCareer() {
		this.setState({
			tooltipOpenCareer: !this.state.tooltipOpenCareer
		});
	}

	render() {
		const { open } = this.state;
		return (
			!this.props.data ?
				<span></span>
			:
			<div style={styles}>
				<h2 className="Link" onClick={this.toggle}>+ Interest</h2>
				<Modal centered={this.state.centered} isOpen={this.state.modal} toggle={this.toggle}>
					<form onSubmit={this.handleSubmit}>
						<ModalHeader toggle={this.toggle}>
							<h2>Interest</h2>
							<p>Add some personal interests and/or career interests!</p>
							<p>"Personal" section is about what you like to do for fun such as video gaming, photography, painting, etc. For more information about how to add a personal interest, put your cursor over <a href="#" id="helppersonal">here</a>.</p>
							<p>"Career" section is about what kind of jobs you may be interested in such as construction, woodwork, veterinary, etc. For more information about how to add a career interest, put your cursor over <a href="#" id="helpcareer">here</a>.</p>
							<Tooltip placement="right" target="helppersonal" isOpen={this.state.tooltipOpenPersonal} toggle={this.toggleTooltipPersonal}> 
								To add a personal interest, type a personal interest that you want to add and press "enter key" to create a new tag. To delete a personal interest, click the "x" button next to the personal interest you want to delete. Once you are finished adding or removing personal interests, click "Submit Changes".
							</Tooltip>
							<Tooltip placement="right" target="helpcareer" isOpen={this.state.tooltipOpenCareer} toggle={this.toggleTooltipCareer}> 
								To add a career interest, search through the career interest in the list when clicking on the input box that says "Select career interest" and click on the career interest that you want. To remove a career interest, simply click "x" next to the career interest you want to remove. Once you are finished selecting or removing career interests, click "Submit Changes".
							</Tooltip>
						</ModalHeader>
						<ModalBody>

							<h3>
								Personal
							</h3>
							<TagsInput
								value={this.state.personal}
								onChange={this.handlePersonal}
								onlyUnique={true}
								inputProps={{className: 'react-tagsinput-input',  placeholder: 'Enter skills'}}
							/>
							<br/>

							<h3>
								Career
							</h3>
							<Select
								multi
								value={this.state.career}
								onChange={this.handleCareer}
								options={this.state.options}
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