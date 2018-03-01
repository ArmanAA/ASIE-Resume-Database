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
        <div className="three columns header-col">
          <h1><span>Availability</span></h1>
        </div>
        <div className="nine columns main-col">
          <form>
            <label><input type="checkbox" name="sunday" defaultChecked={sunday}/> Sunday</label>
            <label><input type="checkbox" name="monday" defaultChecked={monday}/> Monday</label>
            <label><input type="checkbox" name="tuesday" defaultChecked={tuesday}/> Tuesday</label>
            <label><input type="checkbox" name="wednesday" defaultChecked={wednesday}/> Wednesday</label>
            <label><input type="checkbox" name="thursday" defaultChecked={thursday}/> Thursday</label>
            <label><input type="checkbox" name="friday" defaultChecked={friday}/> Friday</label>
            <label><input type="checkbox" name="saturday" defaultChecked={saturday}/> Saturday</label>
            <label><input type="checkbox" name="morning" defaultChecked={morning}/> Morning</label>
            <label><input type="checkbox" name="afternoon" defaultChecked={afternoon}/> Afternoon</label>
            <label><input type="checkbox" name="evening" defaultChecked={evening}/> Evening</label>
            <label> Hours <input type="text" name="hours" defaultValue={hours}/></label>
          </form>
        </div>
      </div>
    );
  }
}