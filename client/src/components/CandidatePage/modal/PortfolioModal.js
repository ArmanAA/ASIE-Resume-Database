import React, { Component } from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import PortfolioAddModal from './PortfolioAddModal';
import './style.css'
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
						{value.title}
					</h4>
				</Col>
				<Col xs="4">
					<Button color="danger">Delete</Button>
				</Col>
			</Row>
			<Row>
				<Col>
					<p>{value.description}</p>
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

export default class PortfolioModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			id: props.id,
			centered: true
		};
		this.componentWillReceiveProps(props);

		this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	onSortEnd = ({oldIndex, newIndex}) => {
		this.setState({
			items: arrayMove(this.state.items, oldIndex, newIndex),
		});
	};

	componentWillReceiveProps(nextProps) {
		this.setState({
			items: nextProps.data || []
		})
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
				<h2 className="Link" onClick={this.toggle}>+ Portfolio</h2>
					<Modal centered={centered} isOpen={modal} toggle={this.toggle}>
						<ModalHeader toggle={this.toggle}>
							<h2>Experience</h2>
							<p>Show your skills by adding images of videos of your portfolio!</p>
						</ModalHeader>
						<ModalBody>
							<div>
								<SortableList items={this.state.items} onSortEnd={this.onSortEnd} helperClass='sortableHelper'/>
							</div>
							<PortfolioAddModal />
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={this.toggle}>Close</Button>
						</ModalFooter>
					</Modal>
			</div>
		);
	}
}