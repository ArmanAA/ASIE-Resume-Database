import React, { Component } from 'react';

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
        <span>Loading Transportation</span>
      :
        <div className="row">
          <div className="three columns header-col">
            <h1><span>Transportation</span></h1>
          </div>
          <div className="nine columns main-col">
            <form onChange={this.send_updates}>
              <label>How to Travel?</label>
              <label><input type="checkbox" name="car" defaultChecked={car}/> Car</label>
              <label><input type="checkbox" name="bike" defaultChecked={bike}/> Bike</label>
              <label><input type="checkbox" name="metro" defaultChecked={metro}/> Metro</label>
              <label><input type="checkbox" name="walk" defaultChecked={walk}/> Walk</label><br/>
              <label> Other <input type="text" name="other" defaultValue={other}/></label><br/>
              <label> Distance <input type="text" name="distance" defaultValue={distance}/></label>
            </form>
          </div>
        </div>
    );
  }
}