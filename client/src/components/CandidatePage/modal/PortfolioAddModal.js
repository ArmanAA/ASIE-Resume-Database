import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const styles = {
	fontFamily: "sans-serif",
	textAlign: "center"
};

export default class PortfolioAddModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			centered: true
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	componentWillReceiveProps(nextProps) {}

	handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target);
		console.log(data);
		fetch('/api/candidate/update/portfolio', {
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
		const { modal, centered } = this.state;
		return (
			<div style={styles}>
				<Button onClick={this.toggle}>+ Add Portfolio</Button>
				<Modal centered={this.state.centered} isOpen={this.state.modal} toggle={this.toggle}>
					<form className="form-group" onSubmit={this.handleSubmit}>
						<ModalHeader toggle={this.toggle}>
								<h5>Add detailed information about your work experience!</h5>
						</ModalHeader>
						<ModalBody>
							<label className='row'> Title: <input className="form-control" type="text" name="title" required/></label>
							<label className='row'> Description: <input className="form-control" type="text" name="description" required/></label>
							<label className='row'> Image: <input className="form-control" type="file" name="image" required/></label>
						
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