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

const SortableItem = SortableElement(({value}) =>
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
					<Button color="danger">Delete</Button>
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
			<SortableItem key={`item-${index}`} index={index} value={value} />
		))}
	</ul>
  );
});

export default class ExperienceModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			centered: true,
			id: props.id
		}
		this.componentWillReceiveProps(props);
		this.toggle = this.toggle.bind(this);
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

	toggle() {
		this.setState({
			modal:!this.state.modal
		});
	}

	render() {
		console.log("EXPERIENCE", this.state.experiences);
		const { modal, centered, experiences } = this.state;
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