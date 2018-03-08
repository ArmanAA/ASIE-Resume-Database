import React, { Component } from 'react';

export default class Availability extends Component {
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
      var days = this.state.data.days;
      var times = this.state.data.times;

      var sunday = this.props.data.days.includes("Sunday");
      var monday = this.props.data.days.includes("Monday");
      var tuesday = this.props.data.days.includes("Tuesday");
      var wednesday = this.props.data.days.includes("Wednesday");
      var thursday = this.props.data.days.includes("Thursday");
      var friday = this.props.data.days.includes("Friday");
      var saturday = this.props.data.days.includes("Saturday");

      var morning = times.includes("Morning");
      var afternoon = times.includes("Afternoon");
      var evening = times.includes("Evening");
      var hours = this.state.data.hours;
    }
    return (
      !this.state.data ?
        <span></span>
      :
        <div className="row">
        <div className="col-3 section-title">
          <h1><span>Availability</span></h1>
        </div>
        <div className="row">
          <form className="form-group section col-10">
          <div className="form-check form-check-inline">
            <label className="form-check-input"><input type="checkbox" name="sunday" defaultChecked={sunday}/> Sunday</label>
            <label className="form-check-input"><input type="checkbox" name="monday" defaultChecked={monday}/> Monday</label>
            <label className="form-check-input"><input type="checkbox" name="tuesday" defaultChecked={tuesday}/> Tuesday</label>
            <label className="form-check-input"><input type="checkbox" name="wednesday" defaultChecked={wednesday}/> Wednesday</label>
            <label className="form-check-input"><input type="checkbox" name="thursday" defaultChecked={thursday}/> Thursday</label>
            <label className="form-check-input"><input type="checkbox" name="friday" defaultChecked={friday}/> Friday</label>
            <label className="form-check-input"><input type="checkbox" name="saturday" defaultChecked={saturday}/> Saturday</label>
           </div>
           <div className="form-check form-check-inline"> 
            <label className="form-check-input"><input type="checkbox" name="morning" defaultChecked={morning}/> Morning</label>
            <label className="form-check-input"><input type="checkbox" name="afternoon" defaultChecked={afternoon}/> Afternoon</label>
            <label className="form-check-input"><input type="checkbox" name="evening" defaultChecked={evening}/> Evening</label>
            </div>
            <div className="form-group">
            <label> Hours <input  className="form-control" type="text" name="hours" defaultValue={hours}/></label>
            </div>
          </form>
        </div>
      </div>
    );
  }
}