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
      regionalclient: props.data.regionalclient,
      rehabclient: props.data.rehabclient
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
        regionalclient: nextProps.data.regionalclient,
        rehabclient: nextProps.data.rehabclient
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
            <form className="form-group" onSubmit={this.handleSubmit}>
              <label className='row'> First name: <input className="form-control"  type="text" name="update_fname" defaultValue={this.state.firstName} required/></label>
              <label className='row'> Last name: <input className="form-control"  type="text" name="update_lname" defaultValue={this.state.lastName} required/></label>
              <label className='row'> Street: <input className="form-control"  type="text" name="update_street" defaultValue={this.state.street} required/></label>
              <label className='row'> City: <input  className="form-control" type="text" name="update_city" defaultValue={this.state.city} required/></label>
              <label className='row'> State: <input  className="form-control" type="text" name="update_state" defaultValue={this.state.state} required/></label>
              <label className='row'> Zip: <input className="form-control"  type="text" name="update_zip" defaultValue={this.state.zip} required/></label>
              <label className='row'> Phone: <input className="form-control"  type="text" name="update_phone" defaultValue={this.state.phone} required/></label>
              <label className='row'> Email: <input className="form-control"  type="text" name="update_email" defaultValue={this.state.email} required/></label>
             
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