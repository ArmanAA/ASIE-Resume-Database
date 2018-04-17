import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const styles = {
	fontFamily: "sans-serif",
	textAlign: "center"
};

export default class ExperienceAddModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			centered: true,
			id: props.id,
			options: [{value: "", name: ""},
						{value: "yes", name: "Yes"},
						{value: "no", name: "No"}]
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	componentWillReceiveProps(nextProps) {}

	handleSubmit(event) {
		this.toggle();
		event.preventDefault();
		const data = new FormData(event.target);
		fetch('/api/candidates/experiences/'+ this.state.id +'/update', {
			method: 'POST',
			body: data,
			credentials: 'include'
		}).then(function(response) {
			if(response) {
				window.location.reload();
			}
			else {
				this.onCloseModal();
			}
		});
	}

	toggle() {
		this.setState({
			modal:!this.state.modal
		});
	}

	render() {
		const { open } = this.state;
		const options = this.state.options.map(option => {
			return <option key={option.value}
				value={option.value}>{option.name}</option>;
		})
		return (
			<div style={styles}>
				<Button onClick={this.toggle}>+ Add Experience</Button>
				<Modal centered={this.state.centered} isOpen={this.state.modal} toggle={this.toggle}>
					<form className="form-group" onSubmit={this.handleSubmit}>
						<ModalHeader toggle={this.toggle}>
								<h5>Add detailed information about your work experience!</h5>
						</ModalHeader>
						<ModalBody>
						
							<label className='row'> What was your job title? <input className="form-control" type="text" name="title" required/></label>
							<label className='row'> What company did you work at? <input className="form-control" type="text" name="company" required/></label>
							<label className='row'> What year did you start working here? <input className="form-control" type="number" name="from" min="1900" max={(new Date()).getFullYear()} required/></label>
							<label className='row'> What year did you stop working here? (If you are currently working here, please put the current year) <input className="form-control" type="number" name="to" min="1900" max={(new Date()).getFullYear()} required/></label>
							<label className='row'> Are you currently working here?</label>
							<select className='row' name="currently" required>{options}</select>
							<label className='row'> Briefly describe your job (optional): <textarea className="form-control" type="text" name="description"/></label>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" type="submit">Submit Changes</Button>{' '}
							<Button color="secondary" onClick={this.toggle}>Cancel</Button>
						</ModalFooter>
					</form>
				</Modal>
			</div>
		);
	}
}