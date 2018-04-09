import React, { Component } from 'react';
// import Modal from 'react-responsive-modal';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {findDOMNode} from 'react-dom'
import ReactTooltip from 'react-tooltip'
import "../../MenuBar.css";
import FaHelp from 'react-icons/lib/fa/question-circle-o';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const styles = {
	fontFamily: "sans-serif",
	textAlign: "center",
};

export default class BasicInfoModal extends Component {
		constructor(props) {
		super(props);
		this.state = {
			firstName: props.data.fname,
			lastName: props.data.lname,
			email: props.data.email,
			city: props.data.city,
			phone: props.data.phone,
			regionalclient: props.data.regionalclient,
			rehabclient: props.data.rehabclient,
			id: props.id,
			modal: false,
			centered: true,
			phoneValidate: true,
			regions: [],

			options: [{value: "", name: ""},
						{value: "yes", name: "Yes"},
						{value: "no", name: "No"},
						{value: "idk", name: "I'm not sure"}]
		};
		//this.fname = props.data.firstName;

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.toggle = this.toggle.bind(this);
		this.validate = this.validate.bind(this);
		this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this);
	}

	componentWillMount() {
		fetch('/api/candidates/profiles/', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		}).then(res => {
			return res.json();
		}).then(json => {
			if (json) {
				this.setState({regions: json});
			}
		})
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.data) {
			this.setState({
				firstName: nextProps.data.fname,
				lastName: nextProps.data.lname,
				email: nextProps.data.email,
				city: nextProps.data.city,
				phone: nextProps.data.phone,
				regionalclient: nextProps.data.regionalclient,
				rehabclient: nextProps.data.rehabclient
			})
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

	validate() {
		if (this.state.phoneValidate) {
			this.toggle();
		}
	}

	handleChange = (selectedOption) => {
		this.setState({city: selectedOption});
	}

	handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target);
		console.log(data);
		let url = '/api/candidates/profiles/' + this.state.id + '/update';
		console.log(url);
		fetch(url , {
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
	const {selectedOption} = this.state;
	const value = selectedOption && selectedOption.value;
	const options = this.state.options.map(option => {
		return <option key={option.value}
			value={option.value}>{option.name}</option>;
	})
	return (
		!this.props.data ?
		<span></span>
		:
		<div style={styles}>
			<h2 className="Link" onClick={this.toggle}>+ Basic Info</h2>
			<Modal centered={this.state.centered} isOpen={this.state.modal} toggle={this.toggle}>
				<form className="form-group" onSubmit={this.handleSubmit}>
				<ModalHeader toggle={this.toggle}>
					<h2>Basic Information</h2>
					<p>Add some information about yourself!</p>
				</ModalHeader>
				
				<ModalBody>
						<label className='row'> First name:
							<input className="form-control"  type="text" name="update_fname" defaultValue={this.state.firstName}/>
						</label>
						<label className='row'> Last name: <input className="form-control"  type="text" name="update_lname" defaultValue={this.state.lastName}/></label>
						<label className='row'> City: </label>
						
						<Select
							name="form-region"
							value={this.state.city}
							onChange={this.handleChange}
							options={this.state.regions}
							name="update_city"

						/>

						<label className='row'> Phone number (format: XXX-XXX-XXXX): <input className="form-control" onChange={this.handleChangePhoneNumber} pattern="\d{3}[\-]\d{3}[\-]\d{4}" title="XXX-XXX-XXXX" type="text" name="update_phone" defaultValue={this.state.phone}/></label>
						<label className='row'> Email address: <input className="form-control"  type="text" name="update_email" defaultValue={this.state.email}/></label>

						<label className='row'>Regional Center Client: </label>
						<select className='row' name="update_regionalclient" defaultValue={this.state.regionalclient}>{options}</select>
						<label className='row'>Department of Rehabilitation Client: </label>
						<select className='row' name="update_rehabclient" defaultValue={this.state.rehabclient}>{options}</select>

						<label className='row'> Profile Image: <input type="file" accept="image/*" name="update_image"/></label>
						
					
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