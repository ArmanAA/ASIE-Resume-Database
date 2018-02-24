import React, { Component } from 'react';

export default class Education extends Component {
  render() {
    return (
      <div className="row">
        <div className="three columns header-col">
          <h1><span>Transportation</span></h1>
        </div>
        <div className="nine columns main-col">
          <form>
            <label>How to Travel?</label>
            <label><input type="checkbox" name="car"/> Car</label>
            <label><input type="checkbox" name="bike"/> Bike</label>
            <label><input type="checkbox" name="metro"/> Metro</label>
            <label><input type="checkbox" name="walk"/> Walk</label>
            <label> Other <input type="text" name="other"/></label>
            <label> Distance <input type="text" name="distance"/></label>
          </form>
        </div>
      </div>
    );
  }
}