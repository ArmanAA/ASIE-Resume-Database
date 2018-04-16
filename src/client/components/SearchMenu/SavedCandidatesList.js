import React from 'react';
import { Button, Form, Input,
				 ListGroup, ListGroupItem, Badge,
				 Modal, ModalHeader, ModalBody, ModalFooter
			 } from 'reactstrap';
import ProfileList from './SavedProfileList';
import DeleteFoldersModal from './DeleteFoldersModal';

export default class SavedCandidatesList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			folders: [],
			current_candidate: 0,
			modal: false
		}
		this.toggle = this.toggle.bind(this);
		this.updateCount = this.updateCount.bind(this);
	}


	componentWillReceiveProps(nextProps) {
		if (nextProps.data) {
			this.setState({
				folders: nextProps.data
			})
		}

	}

	handleClick(event) {
		console.log(this.state.folders);
		if(event.target.tagName == "LI") {
			let entry_row = event.target.getAttribute('entry');
			this.setState({current_candidate: entry_row});
		}
	}

	updateCount(entryId) {
		let newFolders = this.state.folders || [];
		let curr = this.state.current_candidate;
		let entries = newFolders[curr].entry;

		let index = -1;
		for (var i=0; i<entries.length; i++) {
			if (entries[i].entryId == entryId) {
				index = i;
				break;
			}
		}
		if (index > -1) {
			entries.splice(index, 1);
		}
		newFolders[curr].entry = entries;
		this.setState({
			folders: newFolders
		})

	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	render() {
		if(this.state.folders) {
			var folders = this.state.folders.map((folder, index) => {
				return <ListGroupItem entry={index} onClick={this.handleClick.bind(this)} className="justify-content-between">{folder.name} <Badge pill>{folder.entry.length}</Badge></ListGroupItem>
			})
		}
		let candidate_list = [];
		if(folders.length > 0) {
			candidate_list = this.state.folders[this.state.current_candidate].entry;
		}
		console.log("SAVED CANDIDATES LIST", this.state.folders);
		return (
			<div>
				<Button onClick={this.toggle.bind(this)} outline className="mb-2 mr-2" color="primary">Add Folder</Button>
				<AddFolderModal isOpen={this.state.modal} toggle={this.toggle.bind(this)} updateFolders={this.props.updateFolders}/>
				<DeleteFoldersModal updateFolders={this.props.updateFolders} folders={this.state.folders} updateCount={this.updateCount}/>
				<ListGroup>
					{folders}
				</ListGroup>
				<ProfileList updateCount={this.updateCount.bind(this)} data={candidate_list}/>
			</div>
		);
	}
}

class AddFolderModal extends React.Component {
	POSTNewFolder(event) {
		event.preventDefault();
		const data = new FormData(event.target);
		console.log("ADD", data);
		fetch('/api/folders/create', {
			method: 'POST',
			credentials: 'include',
			body: data,
		}).then(res => {
			return res.json();
		}).then(json => {
			if (json.message === "success") {
				this.props.updateFolders();
				this.props.toggle();
			}
		})
	}

	render() {
		return(
			<Modal centered={true} isOpen={this.props.isOpen} toggle={this.props.toggle}>
				<Form onSubmit={this.POSTNewFolder.bind(this)}>
					<ModalHeader toggle={this.props.toggle}>
						<h3>Folder Name</h3>
						<p>Please enter a new folder name</p>
					</ModalHeader>
					<ModalBody>
						<Input className="form-control"  type="text" name="folderName" required/>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" type="submit">Add</Button>
						<Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
					</ModalFooter>
				</Form>
			</Modal>
		)
	}
}