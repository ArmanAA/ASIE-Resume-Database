import React, { Component } from 'react';
export default class Ideal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transportation: [
        "Walk",
        "Bike",
        "Metro",
        "Car",
        "Other"
      ]
    }
  }

  render() {
    if(this.state.transportation) {
      var transportation_options = this.state.transportation.map((option) => {
        const option_element = option === "Other" ?
          <label>{option} <input type="text"/></label>
        :
          <label><input type="checkbox"/> {option}</label>
        return <div key={option}>
            {option_element}
          </div>
      });
    }
    return (
      <div>
        <form>
          <h3>Transportation Information</h3>
          {transportation_options}
          <h3>Hours</h3>
          <p>How many hours can you work per week?</p>
          <label>Hours <input type="text"/> </label>
          <br/>
          <input type="button" value="Back"/>
          <input type="button" value="Next"/>
        </form>
      </div>
    );
  }
}