import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import "../../MenuBar.css";

const styles = {
	fontFamily: "sans-serif",
	textAlign: "center"
};

export default class BasicInfoModal extends Component {
	constructor(props) {
		super(props);
		if(props.data) {
			var methods = props.data.methods;
			var car = methods.includes("Car");
			var bike = methods.includes("Bike");
			var metro = methods.includes("Metro");
			var walk = methods.includes("Walk");
			var other = props.data.other;
			var distance = props.data.distance;

		}
		this.state = {
			open: false,
			car: car,
			bike: bike,
			metro: metro,
			walk: walk,
			other: other,
			distance: distance,
			modal: false,
			centered: true,
			id: props.id
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggle = this.toggle.bind(this);

	}


	componentWillReceiveProps(nextProps) {
		if(nextProps.data) {
			var methods = nextProps.data.methods;
			var car = methods.includes("Car");
			var bike = methods.includes("Bike");
			var metro = methods.includes("Metro");
			var walk = methods.includes("Walk");
			this.setState({
				car: car,
				bike: bike,
				metro: metro,
				walk: walk,
				other: nextProps.data.other,
				distance: nextProps.data.distance
			})
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target);
		fetch('/api/candidates/transportations/' + this.state.id + '/update', {
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
			!this.props.data ?
				<span></span>
			:
			<div style={styles}>
				<h2 className="Link" onClick={this.toggle}>+ Transportation</h2>
				<Modal centered={this.state.centered} isOpen={this.state.modal} toggle={this.toggle}>
					<form onSubmit={this.handleSubmit}>
						<ModalHeader toggle={this.toggle}>
							<h2>Transportation</h2>
							<p>Add some information about how you will get to work!</p>
						</ModalHeader>
						<ModalBody>
							<label className="row">How will you be traveling to work?</label>

							<div className="row">
								<FormGroup className="col-2" role="form" check inline>
									<Label check>
										<Input type="checkbox" name="car" defaultChecked={this.state.car}/> Car
									</Label>
								</FormGroup>
								<FormGroup className="col-2" role="form" check inline>
									<Label check>
										<Input type="checkbox" name="bike" defaultChecked={this.state.bike}/> Bike
									</Label>
								</FormGroup>
								<FormGroup className="col-2" role="form" check inline>
									<Label check>
										<Input type="checkbox" name="metro" defaultChecked={this.state.metro}/> Bus
									</Label>
								</FormGroup>
								<FormGroup className="col-2" role="form" check inline>
									<Label check>
										<Input type="checkbox" name="walk" defaultChecked={this.state.walk}/> Walk
									</Label>
								</FormGroup>
							</div>
							<br/>

							<label className="row"> Are there other ways of transporation that you take? <input className="form-control" type="text" name="other" defaultValue={this.state.other}/></label><br/>
							<label className="row"> How many miles are you willing to travel? <input className="form-control" type="text" name="distance" defaultValue={this.state.distance}/></label>

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