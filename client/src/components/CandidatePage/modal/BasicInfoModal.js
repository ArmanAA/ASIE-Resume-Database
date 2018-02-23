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
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div style={styles}>
        <h2 onClick={this.onOpenModal}>+ Basic Info</h2>
        <Modal open={open} onClose={this.onCloseModal} little>
          <h2>Basic Information</h2>
          <form>
            <label className='row'> First name: <input type="text" name="update_fname" defaultValue={this.props.data.firstName}/></label>
            <label className='row'> Last name: <input type="text" name="update_lname"/></label>
            <label className='row'> Email: <input type="text" name="update_email"/></label>
            <label className='row'> Address: <input type="text" name="update_address"/></label>
            <label className='row'> Profile Image: <input type="file" name="update_image"/></label>
            <input className='row' type="submit" value="Submit" />
          </form>
        </Modal>
      </div>
    );
  }
}