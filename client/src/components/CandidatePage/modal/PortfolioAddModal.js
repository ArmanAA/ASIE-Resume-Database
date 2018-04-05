import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

export default class PortfolioAddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: props.id
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {}

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
    fetch('/api/candidates/portfolios/' + this.state.id + '/update', {
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
        <button onClick={this.onOpenModal}>+ Add Portfolio</button>
        <Modal open={open} onClose={this.onCloseModal} little>
          <form onSubmit={this.handleSubmit}>
            <label className='row'> Title: <input type="text" name="title"/></label>
            <label className='row'> Description: <input type="text" name="description"/></label>
            <label className='row'> Image: <input type="file" name="image"/></label>
            <input className='row' type="submit" value="Submit" />
          </form>
        </Modal>
      </div>
    );
  }
}