import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ExperienceAddModal from './ExperienceAddModal';
import "../../MenuBar.css";

const styles = {
	fontFamily: "sans-serif",
	textAlign: "center"
};



export default class ExperienceModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			centered: true,
			id: props.id,
			removed: false
		}
		this.componentWillReceiveProps(props);
		this.toggle = this.toggle.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
	}

	onSortEnd = ({oldIndex, newIndex}) => {
		this.setState({
			experiences: arrayMove(this.state.experiences, oldIndex, newIndex),
		});
	};

	componentWillReceiveProps(nextProps) {
		if(nextProps.data) {
			let experiences = nextProps.data || [];
			this.setState({
				experiences: experiences
			});
		}
	}

	handleRemove(experience_id, entry_id) {
		fetch('/api/candidates/experiences/' + this.state.id + '/remove', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({id: experience_id}),
			credentials: 'include'
		}).then(response => {
			return response.json()
		}).then(result => {
			if(result.message === "successful") {
				let experiences = this.state.experiences || [];
				if (entry_id > -1) {
					experiences.splice(entry_id, 1);
				}
				this.setState({experiences: experiences, removed: true});
			}
		})
	}

	toggle() {
		if (this.state.removed) {
			window.location.reload();
			this.setState({
				removed: false
			})
		}
		this.setState({
			modal:!this.state.modal
		});
	}

	render() {
		const { modal, centered, experiences } = this.state;

		const SortableItem = SortableElement(({value, sortIndex}) =>
			<div className="noselect">
				<hr/>
				<Container fluid={true}>
					<Row>
						<Col xs="8">
							<h4>
								{value.title} - {value.company}
							</h4>
						</Col>
						<Col xs="4">
							<Button color="danger" onClick={() => this.handleRemove(value.id, sortIndex)}>Delete</Button>
						</Col>
					</Row>
					<Row>
						<Col>
							{
								value.currently ?
								<p>{value.from} - Present </p>
								:
								<p>{value.from} - {value.to}</p>
							}
						</Col>
					</Row>
				</Container>
				<hr/>
			</div>
		);

		const SortableList = SortableContainer(({items}) => {
		  return (
			<ul>
				{items.map((value, index) => (
					<SortableItem key={`item-${index}`} index={index} sortIndex={index} value={value} />
				))}
			</ul>
		  );
		});
		return (
			<div style={styles}>
				<h2 className="Link" onClick={this.toggle}>+ Experience</h2>
					<Modal centered={centered} isOpen={modal} toggle={this.toggle}>
						<ModalHeader toggle={this.toggle}>
							<h2>Experience</h2>
							<p>Add some information about your current or previous work experience!</p>
						</ModalHeader>
						<ModalBody>
							<div>
								<SortableList items={experiences} onSortEnd={this.onSortEnd} helperClass='sortableHelper'/>
							</div>
							<ExperienceAddModal id={this.state.id}/>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={this.toggle}>Close</Button>
						</ModalFooter>
						
						
					
					</Modal>
			</div>
		)
	}
}