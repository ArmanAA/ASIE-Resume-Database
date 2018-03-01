import React, { Component } from 'react';

export default class Education extends Component {
  render() {
    return (
      <div className="row">
        <div className="three columns header-col">
          <h1><span>Transportation</span></h1>
        </div>
        <div className="nine columns main-col info-box">
          <form className="form-group">
            <label>How to Travel?</label>
            <div className="checkboxes">
              <label><input type="checkbox" name="car"/> Car</label>
              <label><input type="checkbox" name="bike"/> Bike</label>
              <label><input type="checkbox" name="metro"/> Metro</label>
              <label><input type="checkbox" name="walk"/> Walk</label>
            </div>
            <label> Other <input className="form-control" type="text" name="other"/></label>
            <label> Distance <input className="form-control" type="text" name="distance"/></label>
          </form>
        </div>
      </div>
    );
  }
}