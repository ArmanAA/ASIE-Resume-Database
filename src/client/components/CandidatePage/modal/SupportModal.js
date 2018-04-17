import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "../../MenuBar.css";

const styles = {
	fontFamily: "sans-serif",
	textAlign: "center"
};

export default class SupportModal extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			modal: false,
			centered: true,
			id: props.id,
			phoneValidate: true
		};

		this.componentWillReceiveProps(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.data) {
			this.setState({
				name: nextProps.data.name,
				relationship: nextProps.data.relationship,
				email: nextProps.data.email,
				phone: nextProps.data.phone
			})
		}
	}

	updateSupport(supportInfo) {
		let url = '/api/candidates/supports/' + this.state.id + '/update';
		fetch(url , {
			method: 'POST',
			body: JSON.stringify(supportInfo),
			headers: {
				'Content-Type': 'application/json',
			},
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

	removeSupport() {
		let url = '/api/candidates/supports/' + this.state.id + '/remove';
		fetch(url , {
			method: 'POST',
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

	validate() {
		if (this.state.phoneValidate) {
			this.toggle();
		}
	}

	handleChangePhoneNumber(event) {
		var pattern = new RegExp("\d{3}[\-]\d{3}[\-]\d{4}");
		if (pattern.test(event.target.value) || event.target.value == "") {
			this.state.phoneValidate = true;
		} else {
			this.state.phoneValidate = false;
		}
	}

	handleSubmit(event) {
		this.toggle();
		event.preventDefault();

		var data = {
			name: event.target.name.value,
			relationship: event.target.relationship.value,
			email: event.target.email.value,
			phone: event.target.phone.value
		}


		this.updateSupport(data);
	}

	toggle() {
		this.setState({
			modal:!this.state.modal
		});
	}

	render() {
		return (
			!this.props.data ?
				<span></span>
			:
			<div style={styles}>
				<h2 className="Link" onClick={this.toggle}>+ Support Contact</h2>
				<Modal centered={this.state.centered} isOpen={this.state.modal} toggle={this.toggle}>
					<form onSubmit={this.handleSubmit}>
						<ModalHeader toggle={this.toggle}>
							<h2>Support Contact Information</h2>
							<p>Is there a support person we can release information and contact? If so, please fill out the form below.</p>
						</ModalHeader>
						<ModalBody>
							<label className="row">
								What is the support person's name?
								<input className="form-control" type="text" name="name" defaultValue={this.state.name}/>
							</label>
							<label className="row">
								What is the support person's relationship to you? <br/> <label>(Example: Mother)</label>
								<input className="form-control" type="text" name="relationship" defaultValue={this.state.relationship}/>
							</label>
							<label className="row">
								What is the support person's email?
								<input className="form-control" type="email" name="email" defaultValue={this.state.email}/>
							</label>
							<label className="row">
								What is the support person's phone number? <br/> <label>(format: XXX-XXX-XXXX)</label>
								<input className="form-control" onChange={this.handleChangePhoneNumber} pattern="\d{3}[\-]\d{3}[\-]\d{4}" title="XXX-XXX-XXXX" t type="text" name="phone" defaultValue={this.state.phone}/>
							</label>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={this.validate} type="submit">Submit Changes</Button>{' '}
							<Button color="secondary" onClick={this.toggle}>Cancel</Button>
						</ModalFooter>
					</form>
				</Modal>
			</div>
		);
	}
}