import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import "../../MenuBar.css";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  modal: {
    maxWidth: 800,
    position: 'relative',
    padding: '1.2rem',
    background: '#ffffff',
    backgroundClip: 'padding-box',
    boxShadow: '0 12px 15px 0 rgba(0,0,0,0.25)',
  }
};

export default class BasicInfoModal extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      open: false,
      firstName: props.data.fname,
      lastName: props.data.lname,
      email: props.data.email,
      city: props.data.city,
      phone: props.data.phone,
      regionalclient: props.data.regionalclient,
      rehabclient: props.data.rehabclient,
      id: props.id,

      options: [{value: "", name: ""},
                {value: "yes", name: "Yes"},
                {value: "no", name: "No"},
                {value: "idk", name: "I'm not sure"}]
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
        city: nextProps.data.city,
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
    let url = '/api/candidates/profiles/' + this.state.id + '/update';
    console.log(url);
    fetch(url , {
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
    const options = this.state.options.map(option => {
      return <option key={option.value}
          value={option.value}>{option.name}</option>;
    })
    return (
      !this.props.data ?
        <span></span>
      :
        <div style={styles}>
          <h2 className="Link" onClick={this.onOpenModal}>+ Basic Info</h2>
          <Modal open={open} onClose={this.onCloseModal} style={styles.modal}>
            <h2>Basic Information</h2>
            <form className="form-group" onSubmit={this.handleSubmit}>
              <label className='row'> First name: <input className="form-control"  type="text" name="update_fname" defaultValue={this.state.firstName}/></label>
              <label className='row'> Last name: <input className="form-control"  type="text" name="update_lname" defaultValue={this.state.lastName}/></label>
              <label className='row'> Region: <input  className="form-control" type="text" name="update_city" defaultValue={this.state.city}/></label>
              <label className='row'> Phone number: <input className="form-control"  type="text" name="update_phone" defaultValue={this.state.phone}/></label>

              <label className='row'>Regional Center Client: <select name="update_regionalclient" defaultValue={this.state.regionalclient}>{options}</select></label>
              <label className='row'>Department of Rehabilitation Client: <select name="update_rehabclient" defaultValue={this.state.rehabclient}>{options}</select></label>

              <label className='row'> Profile Image: <input type="file" name="update_image"/></label>
              <input className='row' type="submit" value="Submit" />
            </form>
          </Modal>
        </div>
    );
  }
}