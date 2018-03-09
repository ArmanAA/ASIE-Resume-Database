import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

export default class BasicInfoModal extends Component {
  constructor(props) {
    super(props);
    if(props.data) {
      var methods = props.data.methods;
      var car = methods.includes("Car");
      var bike = methods.includes("Bike");
      var metro = methods.includes("Metro");
      var walk = methods.includes("Walk");
      var other = props.data.other;
      var distance = props.data.distance;

    }
    this.state = {
      open: false,
      car: car,
      bike: bike,
      metro: metro,
      walk: walk,
      other: other,
      distance: distance
    }

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
      var methods = nextProps.data.methods;
      var car = methods.includes("Car");
      var bike = methods.includes("Bike");
      var metro = methods.includes("Metro");
      var walk = methods.includes("Walk");
      this.setState({
        car: car,
        bike: bike,
        metro: metro,
        walk: walk,
        other: nextProps.data.other,
        distance: nextProps.data.distance
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data);
    fetch('/api/candidate/update/transportation', {
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
          <h2 onClick={this.onOpenModal}>+ Transporation</h2>
          <Modal open={open} onClose={this.onCloseModal} little>
            <h2>Basic Information</h2>
            <form className="form-group" onSubmit={this.handleSubmit}>
              <label>How to Travel?</label>
              <div className="form-check form-check-inline">
              <label className="form-check-input "><input type="checkbox" name="car" defaultChecked={this.state.car}/> Car</label>
              <label className="form-check-input "><input type="checkbox" name="bike" defaultChecked={this.state.bike}/> Bike</label>
              <label className="form-check-input "><input type="checkbox" name="metro" defaultChecked={this.state.metro}/> Metro</label>
              <label className="form-check-input "><input type="checkbox" name="walk" defaultChecked={this.state.walk}/> Walk</label><br/>
              </div>
              <div className="form-group">
              <label> Other <input className="form-control" type="text" name="other" defaultValue={this.state.other}/></label><br/>
              <label> Distance <input className="form-control" type="text" name="distance" defaultValue={this.state.distance}/></label>
              <input className='row' type="submit" value="Submit" />
              </div>
            </form>
          </Modal>
        </div>
    )
  }
}