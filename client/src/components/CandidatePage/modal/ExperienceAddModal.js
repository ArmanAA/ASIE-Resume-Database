import React, { Component } from "react";
import Modal from "react-responsive-modal";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

export default class ExperienceAddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
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
    fetch("/api/candidate/update/experience", {
      method: "POST",
      body: data,
      credentials: "include"
    }).then(function(response) {
      if (response) {
        window.location.reload();
      } else {
        this.onCloseModal();
      }
    });
  }

  render() {
    const { open } = this.state;
    return (
      <div style={styles}>
        <button onClick={this.onOpenModal}>+ Add Experience</button>
        <Modal open={open} onClose={this.onCloseModal} little>
          <form onSubmit={this.handleSubmit}>
            <label className="row">
              {" "}
              Title: <input type="text" name="title" />
            </label>
            <label className="row">
              {" "}
              Company: <input type="text" name="company" />
            </label>
            <label className="row">
              {" "}
              From: <input type="text" name="from" />
            </label>
            <label className="row">
              {" "}
              To: <input type="text" name="to" />
            </label>
            <label className="row">
              {" "}
              Currently working: <input type="checkbox" name="currently" />
            </label>
            <label className="row">
              {" "}
              Description: <input type="text" name="description" />
            </label>
            <input className="row" type="submit" value="Submit" />
          </form>
        </Modal>
      </div>
    );
  }
}
