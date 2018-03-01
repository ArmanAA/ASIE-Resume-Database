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
      firstName: props.data.fname,
      lastName: props.data.lname,
      email: props.data.email,
      street: props.data.street,
      city: props.data.city,
      state: props.data.state,
      zip: props.data.zip,
      phone: props.data.phone,
      regionalclient: props.data.update_regionalclient,
      rehabclient: props.data.update_rehabclient
    };
    //this.fname = props.data.firstName;

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data) {
      this.setState({
        firstName: nextProps.data.fname,
        lastName: nextProps.data.lname,
        email: nextProps.data.email,
        street: nextProps.data.street,
        city: nextProps.data.city,
        state: nextProps.data.state,
        zip: nextProps.data.zip,
        phone: nextProps.data.phone,
        regionalclient: nextProps.data.update_regionalclient,
        rehabclient: nextProps.data.update_rehabclient
      })
    }
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
      !this.props.data ?
        <span></span>
      :
        <div style={styles}>
          <h2 onClick={this.onOpenModal}>+ Basic Info</h2>
          <Modal open={open} onClose={this.onCloseModal} little>
            <h2>Basic Information</h2>
            <form onSubmit={this.handleSubmit}>
              <label className='row'> First name: <input type="text" name="update_fname" defaultValue={this.state.firstName}/></label>
              <label className='row'> Last name: <input type="text" name="update_lname" defaultValue={this.state.lastName}/></label>
              <label className='row'> Street: <input type="text" name="update_street" defaultValue={this.state.street}/></label>
              <label className='row'> City: <input type="text" name="update_city" defaultValue={this.state.city}/></label>
              <label className='row'> State: <input type="text" name="update_state" defaultValue={this.state.state}/></label>
              <label className='row'> Zip: <input type="text" name="update_zip" defaultValue={this.state.zip}/></label>
              <label className='row'> Phone: <input type="text" name="update_phone" defaultValue={this.state.phone}/></label>
              <label className='row'> Email: <input type="text" name="update_email" defaultValue={this.state.email}/></label>
              <label className='row'> Regional Center Client: <input type="checkbox" name="update_regionalclient" defaultChecked={this.state.regionalclient}/></label>
              <label className='row'> Department of Rehabilitation Client: <input type="checkbox" name="update_rehabclient" defaultChecked={this.state.rehabclient}/></label>
              
              <label className='row'> Profile Image: <input type="file" name="update_image"/></label>
              <input className='row' type="submit" value="Submit" />
            </form>
          </Modal>
        </div>
    );
  }
}