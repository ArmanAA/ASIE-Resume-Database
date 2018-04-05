import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import "../../MenuBar.css";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

export default class HoursModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: props.id
    }
    this.componentWillReceiveProps(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.data) {
      let data = nextProps.data || {};
      let days = data.days || [];
      let times = data.times || [];
      let hours = nextProps.data.hours || 0;
      this.setState({
        sunday: days.includes("Sunday") || false,
        monday: days.includes("Monday") || false,
        tuesday: days.includes("Tuesday") || false,
        wednesday: days.includes("Wednesday") || false,
        thursday: days.includes("Thursday") || false,
        friday: days.includes("Friday") || false,
        saturday: days.includes("Saturday") || false,
        morning: times.includes("Morning") || false,
        afternoon: times.includes("Afternoon") || false,
        evening: times.includes("Evening") || false,
        hours: hours
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data);
    fetch('/api/candidates/hours/' + this.state.id + '/update', {
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
        <h2 className="Link" onClick={this.onOpenModal}>+ Hours</h2>
        <Modal open={open} onClose={this.onCloseModal} little>
          <h2>Hours</h2>
          <form onSubmit={this.handleSubmit}>
            <label>How to Travel?</label><br/>
            <label><input type="checkbox" name="sunday" defaultChecked={this.state.sunday}/> Sunday </label>
            <label><input type="checkbox" name="monday" defaultChecked={this.state.monday}/> Monday </label>
            <label><input type="checkbox" name="tuesday" defaultChecked={this.state.tuesday}/> Tuesday </label>
            <label><input type="checkbox" name="wednesday" defaultChecked={this.state.wednesday}/> Wednesday </label>
            <label><input type="checkbox" name="thursday" defaultChecked={this.state.thursday}/> Thursday </label>
            <label><input type="checkbox" name="friday" defaultChecked={this.state.friday}/> Friday </label>
            <label><input type="checkbox" name="saturday" defaultChecked={this.state.saturday}/> Saturday </label>
            <br/>
            <label><input type="checkbox" name="morning" defaultChecked={this.state.morning}/> Morning </label>
            <label><input type="checkbox" name="afternoon" defaultChecked={this.state.afternoon}/> Afternoon </label>
            <label><input type="checkbox" name="evening" defaultChecked={this.state.evening}/> Evening </label>
            <br/>
            <label>Hours <input type="text" name="hours" defaultValue={this.state.hours}/></label>
            <br/>
            <input className='row' type="submit" value="Submit" />
          </form>
        </Modal>
      </div>
    )
  }
}