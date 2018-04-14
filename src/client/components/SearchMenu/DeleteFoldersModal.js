import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Alert} from 'reactstrap';

export default class DeleteFoldersModal extends Component {
	constructor(props) {
		super(props);
		console.log("PROPS", props);
		this.state = {
			modal: false,
			id: props.id,
			centered: true,
			folders: props.folders,
			selectedFolder: props.folders.length == 0 ? -1 : props.folders[0].id
		};

		this.toggle = this.toggle.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFolderSelect = this.handleFolderSelect.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		console.log("NEXTPROPS",nextProps);
		if(nextProps.folders) {
			this.setState({
				folders: nextProps.folders,
				selectedFolder: nextProps.folders.length == 0 ? -1 : nextProps.folders[0].id
			})
		}
	}

	toggle() {
		this.setState({
			modal:!this.state.modal
		});
	}

	handleSubmit(folderId) {
		console.log("deleting folder", this.state.selectedFolder);
		fetch('/api/folders/deletefolder' , {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				folderId: this.state.selectedFolder
			}),
			credentials: 'include'
		}).then(res => {
			return res.json();
		}).then(json => {
			if (json.message =="successful") {
				this.props.updateFolders();
				this.props.updateCount();
			}
			this.toggle();
		})
	}
	

	handleFolderSelect(event) {
		event.preventDefault();
		console.log('folder id ', event.target.value);
		this.setState({
			selectedFolder: event.target.value
		})
	}

	render() {
		const { modal, centered } = this.state;
		console.log("FOLDERS DELETE MODAL", this.state.folders);

		var disable = true;
		if(this.state.folders) {
			var folders = this.state.folders.map((folder, index) => {
				return <option value={folder.id}>{folder.name}</option>
			})
			if (this.state.folders.length > 0) {
				disable = false;
			}
		}

		return (
			<span>
				<Button color="primary" outline className="mb-2" onClick={this.toggle}>Delete Folder</Button>
					<Modal centered={centered} isOpen={modal} toggle={this.toggle}>
						<form className="form-group">
							<ModalHeader toggle={this.toggle}>
								<h2>Delete Folder</h2>
							</ModalHeader>
							<ModalBody>
								{
									disable ?
										<Alert color="danger">
											There is no folder available to delete.
										</Alert>
									:
									<span></span>
								}
								<Label>Select the folder you would like to delete</Label>
								<Input onChange={this.handleFolderSelect} type="select">
									{folders}
								</Input>
							</ModalBody>
							<ModalFooter>
								<Button color="primary" onClick={this.handleSubmit} disabled={disable}>Delete</Button>
								<Button onClick={this.toggle}>Cancel</Button>
							</ModalFooter>
						</form>
					</Modal>
			</span>
		);
	}
}