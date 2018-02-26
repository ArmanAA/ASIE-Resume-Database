import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

export default class BasicInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.fname = props.data.firstName;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data);
    fetch('/api/candidate/update/profile', {
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

  render() {
    const { open } = this.state;
    return (
      <div style={styles}>
        <h2 onClick={this.onOpenModal}>+ Basic Info</h2>
        <Modal open={open} onClose={this.onCloseModal} little>
          <h2>Basic Information</h2>
          <form onSubmit={this.handleSubmit}>
            <label className='row'> First name: <input type="text" name="update_fname" defaultValue={this.props.data.firstName}/></label>
            <label className='row'> Last name: <input type="text" name="update_lname" defaultValue={this.props.data.lastName}/></label>
            <label className='row'> Email: <input type="text" name="update_email" defaultValue={this.props.data.email}/></label>
            <label className='row'> Address: <input type="text" name="update_address"/></label>
            <label className='row'> Profile Image: <input type="file" name="update_image"/></label>
            <input className='row' type="submit" value="Submit" />
          </form>
        </Modal>
      </div>
    );
  }
}