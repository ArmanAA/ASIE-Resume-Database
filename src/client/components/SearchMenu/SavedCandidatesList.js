import React from 'react';
import { Button, Form, Input,
         ListGroup, ListGroupItem, Badge,
         Modal, ModalHeader, ModalBody, ModalFooter
       } from 'reactstrap';
import ProfileList from './ProfileList';

export default class SavedCandidatesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      current_candidate: 0,
      modal: false
    }
    this.toggle.bind(this);
  }

  componentWillMount() {
    this.getfoldentries();
  }

  getfoldentries() {
    fetch('/api/folders/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => {
      return res.json();
    }).then(json => {
      if (json) {
        this.setState({folders: json});
      }
    })
  }

  handleClick(event) {
    if(event.target.tagName == "LI") {
      let entry_row = event.target.getAttribute('entry');
      this.setState({current_candidate: entry_row});
    }
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
    return (
      <div>
        <Button onClick={this.toggle.bind(this)} color="primary">Add Folder</Button>
        <AddFolderModal isOpen={this.state.modal} toggle={this.toggle.bind(this)}/>
        <ListGroup>
          {folders}
        </ListGroup>
        <ProfileList data={candidate_list}/>
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
        this.setState({folders: json});
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
            <Input className="form-control"  type="text" name="folderName"/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.validate} type="submit">Add</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
}