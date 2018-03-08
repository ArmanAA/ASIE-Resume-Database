import React, { Component } from 'react';
import "./css/candidate.css";

export default class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data});
  }

  render() {
    if(this.state.data) {
      var methods = this.state.data.methods;
      var car = methods.includes("Car");
      var bike = methods.includes("Bike");
      var metro = methods.includes("Metro");
      var walk = methods.includes("Walk");
      var other = this.state.data.other;
      var distance = this.state.data.distance;
    }
    return (
      !this.state.data ?
        <span></span>
      :
        <div className="row">
          <div className="col-3 section-title">
            <h1>Transportation</h1>
          </div>
          <div className="row">
            <form className="form-group section col-10">
              <div className="label">
                <label>How to Travel?</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-input"> <input  type="checkbox" name="car" defaultChecked={car}/> Car</label>
                <label className="form-check-input"> <input  type="checkbox" name="bike" defaultChecked={bike}/> Bike</label>
                <label className="form-check-input"> <input  type="checkbox" name="metro" defaultChecked={metro}/> Metro</label>
                <label className="form-check-input"> <input  type="checkbox" name="walk" defaultChecked={walk}/> Walk</label><br/>
              </div>
              <div className="form-group">
                <label> Other <input className="form-control" type="text" name="other" defaultValue={other}/></label><br/>
                <label> Distance <input className="form-control" type="text" name="distance" defaultValue={distance}/></label>
              </div>
            </form>
          </div>
        </div>
    );
  }
}