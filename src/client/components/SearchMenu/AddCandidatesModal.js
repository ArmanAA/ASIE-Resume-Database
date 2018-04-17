import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Alert} from 'reactstrap';

export default class AddCandidatesModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			id: props.id,
			centered: true,
			selected: props.data,
			folders: props.folders,
			selectedFolder: props.selectedFolder
		};

		this.toggle = this.toggle.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFolderSelect = this.handleFolderSelect.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.data) {
			this.setState({
				selected: nextProps.data,
				folders: nextProps.folders,
				selectedFolder: nextProps.selectedFolder
			})
		}
	}

	toggle() {

		this.setState({
			modal:!this.state.modal
		});
	}

	handleSubmit() {


		for (var i=0; i<this.state.selected.length; i++) {
			this.saveCandidate(this.state.selected[i], this.state.selectedFolder);
		}
		
	}

	saveCandidate(candidateId, folderId) {
		fetch('/api/folders/add' , {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				folderId: folderId,
				candidateId: candidateId
			}),
			credentials: 'include'
		}).then(res => {
			return res.json();
		}).then(json => {
			if (json.message =="successful") {
				alert("Adding candidates successful!");
				this.props.updateFolders();
			}
			this.toggle();
		})
	}
	

	getfoldentries() {
		fetch('/api/folders/', {
			method: 'GET',
			headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			},
			credentials: 'include'
		}).then(res => {
			return res.json();
		}).then(json => {
			if (json) {
				this.setState({
					folders: json,
					selectedFolder: json[0].id
				});
			}
		})
	}

	handleFolderSelect(event) {
		event.preventDefault();
		this.setState({
			selectedFolder: event.target.value
		})
	}

	render() {
		const { modal, centered } = this.state;
		var disable = true;
		if(this.state.folders) {
			var folders = this.state.folders.map((folder, index) => {
				return <option value={folder.id}>{folder.name}</option>
			})
			if (this.state.folders.length > 0 && this.state.selected.length > 0) {
				disable = false;
			}
		}

		return (
			<div>
				<Button outline className="mb-2"color="primary" onClick={this.toggle}>Save Selected Candidates</Button>
					<Modal centered={centered} isOpen={modal} toggle={this.toggle}>
						<form className="form-group">
							<ModalHeader toggle={this.toggle}>
								<h2>Which folder do you want to save these candidates?</h2>
							</ModalHeader>
							<ModalBody>
								{
									disable ?
										<Alert color="danger">
											You did not choose any candidates to save and/or you do not have any folders created.
										</Alert>
									:
									<span></span>
								}
								<Label>Select folder you want to save to candidates to:</Label>
								<Input onChange={this.handleFolderSelect} type="select">
									{folders}
								</Input>
							</ModalBody>
							<ModalFooter>
								<Button color="primary" onClick={this.handleSubmit} disabled={disable}>Save</Button>
								<Button onClick={this.toggle}>Cancel</Button>
							</ModalFooter>
						</form>
					</Modal>
			</div>
		);
	}
}