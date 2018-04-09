import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "../../MenuBar.css";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const styles = {
	fontFamily: "sans-serif",
	textAlign: "center"
};

export default class DisabilityModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			centered: true,
			disabilities: props.data,
			id: props.id,
			disabled: true,
			options: [],
			tooltipOpen: false
		};

		this.toggle = this.toggle.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentWillMount() {
		fetch('/api/candidates/disabilities/', {
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

	componentWillReceiveProps(nextProps) {
		if(nextProps.data) {
			this.setState({
				disabilities: nextProps.data
			})
		}
	}

	updateData(type, disability) {
		fetch('/api/candidates/disabilities/' + this.state.id + '/update', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({type: type, disability: disability}),
			credentials: 'include'
		});
	}

	handleChange(disability) {
		let newDisability = [];
		for (var i=0; i<disability.length; i++) {
			newDisability.push(disability[i].value);
		}
		let oldDisability = this.state.disabilities;
		let removeDisability = oldDisability.filter(x => !newDisability.includes(x));
		let addDisability = newDisability.filter(x => !oldDisability.includes(x));
		for (var i=0; i<removeDisability.length; i++) {
			this.updateData("remove", removeDisability[i]);
		}
		for (var i=0; i<addDisability.length; i++) {
			this.updateData("add", addDisability[i]);
		}
		this.setState({disabilities: newDisability});
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
		return (
			!this.props.data ?
				<span></span>
			:
			<div style={styles}>
				<h2 className="Link" onClick={this.toggle}>+ Additional Info</h2>
				<Modal centered={this.state.centered} isOpen={this.state.modal} toggle={this.toggle}>
					<form onSubmit={this.handleSubmit}>
						<ModalHeader toggle={this.toggle}>
							<h2>Additional Information</h2>
						</ModalHeader>
						<ModalBody>
							<p>Select the conditions that apply to you: </p>
							<Select
								multi
								value={this.state.disabilities}
								onChange={this.handleChange}
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