import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

export default class BasicInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      skills: props.data.skills,
      tags: props.data
    };
    //this.fname = props.data.firstName;

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data) {
      this.setState({
        skills: nextProps.data.skills,
        tags: nextProps.data
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
    fetch('/api/candidate/update/skills', {
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
              <input className='row' type="submit" value="Submit" />
            </form>
          </Modal>
        </div>
    );
  }
}