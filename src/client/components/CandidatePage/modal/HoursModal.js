import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import "../../MenuBar.css";

const styles = {
	fontFamily: "sans-serif",
	textAlign: "center"
};

export default class HoursModal extends Component {
	constructor(props) {
	super(props);
		this.state = {
			modal: false,
			centered: true,
			id: props.id
		}
		this.componentWillReceiveProps(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.data) {
			let data = nextProps.data || {};
			let days = data.days || [];
			let times = data.times || [];
			let hours = nextProps.data.hours || 0;
			this.setState({
				sunday: days.includes("Sunday") || false,
				monday: days.includes("Monday") || false,
				tuesday: days.includes("Tuesday") || false,
				wednesday: days.includes("Wednesday") || false,
				thursday: days.includes("Thursday") || false,
				friday: days.includes("Friday") || false,
				saturday: days.includes("Saturday") || false,
				morning: times.includes("Morning") || false,
				afternoon: times.includes("Afternoon") || false,
				evening: times.includes("Evening") || false,
				hours: hours
			});
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target);
		fetch('/api/candidates/hours/' + this.state.id + '/update', {
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
		return (
			<div style={styles}>
				<h2 className="Link" onClick={this.toggle}>+ Hours</h2>
				<Modal centered={this.state.centered} isOpen={this.state.modal} toggle={this.toggle}>
					<form onSubmit={this.handleSubmit}>
						<ModalHeader toggle={this.toggle}>
							<h2>Hours</h2>
							<p>Add some information about the hours you are willing to work!</p>
						</ModalHeader>
						<ModalBody>
							<label>Which days of the week are you willing to work?</label><br/>
							
							<div className="row">
								<label className="col-12"><input type="checkbox" name="sunday" defaultChecked={this.state.sunday}/> Sunday </label>
								<label className="col-12"><input type="checkbox" name="monday" defaultChecked={this.state.monday}/> Monday </label>
								<label className="col-12"><input type="checkbox" name="tuesday" defaultChecked={this.state.tuesday}/> Tuesday </label>
								<label className="col-12"><input type="checkbox" name="wednesday" defaultChecked={this.state.wednesday}/> Wednesday </label>
								<label className="col-12"><input type="checkbox" name="thursday" defaultChecked={this.state.thursday}/> Thursday </label>
								<label className="col-12"><input type="checkbox" name="friday" defaultChecked={this.state.friday}/> Friday </label>
								<label className="col-12"><input type="checkbox" name="saturday" defaultChecked={this.state.saturday}/> Saturday </label>
							</div>
							<br/>
							<label className="row">What times of the day are you willing to work?</label>
							<div className="row">
								<label className="col-12"><input type="checkbox" name="morning" defaultChecked={this.state.morning}/> Morning </label>
								<label className="col-12"><input type="checkbox" name="afternoon" defaultChecked={this.state.afternoon}/> Afternoon </label>
								<label className="col-12"><input type="checkbox" name="evening" defaultChecked={this.state.evening}/> Evening </label>
							</div>
							<br/>
							<label className="row">How many hours are you willing to work weekly?</label>
							<label className="row"><input className="form-control" type="text" name="hours" defaultValue={this.state.hours}/></label>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={this.toggle} type="submit">Submit Changes</Button>{' '}
							<Button color="secondary" onClick={this.toggle}>Cancel</Button>
						</ModalFooter>
					</form>
				</Modal>
				
			</div>
		)
	}
}