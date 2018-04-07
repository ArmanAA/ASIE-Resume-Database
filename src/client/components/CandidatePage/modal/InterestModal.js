import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'
import "../../MenuBar.css";
import ReactTooltip from 'react-tooltip';
import FaHelp from 'react-icons/lib/fa/question-circle-o';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

const styles = {
	fontFamily: "sans-serif",
	textAlign: "center"
};


const options = [
	{ label: 'Accounting', value: 'Accounting' },
	{ label: 'Administrative', value: 'Administrative' },
	{ label: 'Advertising', value: 'Advertising' },
	{ label: 'Aerospace', value: 'Aerospace' },
	{ label: 'Agriculture', value: 'Agriculture' },
	{ label: 'Architecture', value: 'Architecture' },
	{ label: 'Automotive', value: 'Automotive' },
	{ label: 'Banking', value: 'Banking' },
	{ label: 'Biotech', value: 'Biotech' },
	{ label: 'Business', value: 'Business' },
	{ label: 'Clothing', value: 'Clothing' },
	{ label: 'Communications', value: 'Communications' },
	{ label: 'Construction', value: 'Construction' },
	{ label: 'Creative Design', value: 'Creative Design' },
	{ label: 'Customer Service', value: 'Customer Service' },
	{ label: 'Defense', value: 'Defense' },
	{ label: 'Editorial', value: 'Editorial' },
	{ label: 'Food Services', value: 'Food Services' },
	{ label: 'Government', value: 'Government' },
	{ label: 'Healthcare', value: 'Healthcare' },
	{ label: 'Hospitality', value: 'Hospitality' },
	{ label: 'Human Resources', value: 'Human Resources' },
	{ label: 'Information and Arts', value: 'Information and Arts' },
	{ label: 'Information Technology', value: 'Information Technology' },
	{ label: 'Inspection and Compliance', value: 'Inspection and Compliance' },
	{ label: 'Installations', value: 'Installations' },
	{ label: 'Insurance', value: 'Insurance' },
	{ label: 'Law Enforcement', value: 'Law Enforcement' },
	{ label: 'Legal', value: 'Legal' },
	{ label: 'Library', value: 'Library' },
	{ label: 'Logistics', value: 'Logistics' },
	{ label: 'Maintenance', value: 'Maintenance' },
	{ label: 'Management', value: 'Management' },
	{ label: 'Manufacturing', value: 'Manufacturing' },
	{ label: 'Education', value: 'Education' },
	{ label: 'Engineering', value: 'Engineering' },
	{ label: 'Environmental', value: 'Environmental' },
	{ label: 'Equipment and Facilities', value: 'Equipment and Facilities' },
	{ label: 'Finance', value: 'Finance' },
	{ label: 'Fishing', value: 'Fishing' },
	{ label: 'Marketing', value: 'Marketing' },
	{ label: 'Media', value: 'Media' },
	{ label: 'Medical', value: 'Medical' },
	{ label: 'Non-Profit', value: 'Non-Profit' },
	{ label: 'Packing and Processing', value: 'Packing and Processing' },
	{ label: 'Painting', value: 'Painting' },
	{ label: 'Personal Services', value: 'Personal Services' },
	{ label: 'Plumbing', value: 'Plumbing' },
	{ label: 'Printing', value: 'Printing' },
	{ label: 'Project Management', value: 'Project Management' },
	{ label: 'Quality Assurance', value: 'Quality Assurance' },
	{ label: 'Real Estate', value: 'Real Estate' },
	{ label: 'Research and Development', value: 'Research and Development' },
	{ label: 'Retail', value: 'Retail' },
	{ label: 'Sales', value: 'Sales' },
	{ label: 'Science', value: 'Science' },
	{ label: 'Security', value: 'Security' },
	{ label: 'Social Sciences/Services', value: 'Social Sciences/Services' },
	{ label: 'Software', value: 'Software' },
	{ label: 'Supply', value: 'Supply' },
	{ label: 'Telecommunications', value: 'Telecommunications' },
	{ label: 'Transportation', value: 'Transportation' },
	{ label: 'Veterinary', value: 'Veterinary' },
	{ label: 'Warehouse', value: 'Warehouse' },
	{ label: 'Woodwork', value: 'Woodwork' },


];

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
			disabled: true
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handlePersonal = this.handlePersonal.bind(this);
		this.handleCareer = this.handleCareer.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.data) {
			this.setState({
				personal: nextProps.data.personal_interest,
				career: nextProps.data.career_interest
			});
		}
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
							<p>"Personal" section is about your personal interests such as video gaming, photography, painting, etc.</p>
							<p>"Career" section is about your career intersts such as construction, woodwork, veterinary, etc.</p>
							<p>For more information about how to add interests to each section, put your cursor over the "Help" button.</p>
						</ModalHeader>
						<ModalBody>

							<h3>
								Personal
							</h3>
							<Button disabled={true} color="primary" data-for="personal" data-tip="React-tooltip">Help</Button>
							<label><ReactTooltip id="personal" place="right" type="info" effect="solid"> 
								<span>To add a personal interest, type a personal interest that you want to add and press "enter key" to create a new tag. To delete a personal interest, click the "x" button next to the personal interest you want to delete. Once you are finished adding or removing personal interests, click "Submit Changes"</span> 
							</ReactTooltip></label>
							
							
							
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
							<Button disabled={true} color="primary" data-for="career" data-tip="React-tooltip">Help</Button>
							<label><ReactTooltip id="career" place="right" type="info" effect="solid"> 
								<span>To add a career interest, search through the career interest in the list when clicking on the input box that says "Select career interest" and click on the career interest that you want. To remove a career interest, simply click "x" next to the career interest you want to remove. Once you are finished selecting or removing career interests, click "Submit Changes"</span> 
							</ReactTooltip>
							</label>
							
							<Select
								multi
								value={this.state.career}
								onChange={this.handleCareer}
								options={options}
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