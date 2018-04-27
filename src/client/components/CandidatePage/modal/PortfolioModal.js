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



export default class PortfolioModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			id: props.id,
			centered: true,
			removed: false
		};
		this.componentWillReceiveProps(props);

		this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
		this.toggle = this.toggle.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
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

	handleRemove(portfolio_id, entry_id) {
		fetch('/api/candidates/portfolios/' + this.state.id + '/remove', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({id: portfolio_id}),
			credentials: 'include'
		}).then(response => {
			return response.json()
		}).then(result => {
			if(result.message === "successful") {
				let items = this.state.items || [];
				if (entry_id > -1) {
					items.splice(entry_id, 1);
				}
				this.setState({items: items, removed: true});
			}
		})
	}

	render() {
		const { modal, centered } = this.state;

		const SortableItem = SortableElement(({value, sortIndex}) =>
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
							<Button color="danger" onClick={() => this.handleRemove(value.id, sortIndex)}>Delete</Button>
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
						<SortableItem key={`item-${index}`} index={index} sortIndex={index} value={value} />
					))}
				</ul>
			);
		});

		return (
			<div style={styles}>
				<h2 className="Link" onClick={this.toggle}>+ Portfolio</h2>
					<Modal centered={centered} isOpen={modal} toggle={this.toggle}>
						<ModalHeader toggle={this.toggle}>
							<h2>Portfolio</h2>
							<p>Show your skills by adding images or videos of your portfolio!</p>
						</ModalHeader>
						<ModalBody>
							<div>
								<SortableList items={this.state.items} onSortEnd={this.onSortEnd} helperClass='sortableHelper'/>
							</div>
							<PortfolioAddModal id={this.state.id}/>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={this.toggle}>Close</Button>
						</ModalFooter>
					</Modal>
			</div>
		);
	}
}