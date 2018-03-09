import React, { Component } from 'react';

export default class Hours extends Component {
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

      var sunday = days.includes("Sunday");
      var monday = days.includes("Monday");
      var tuesday = days.includes("Tuesday");
      var wednesday = days.includes("Wednesday");
      var thursday = days.includes("Thursday");
      var friday = days.includes("Friday");
      var saturday = days.includes("Saturday");

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
            <h1>Hours</h1>
          </div>
          <div className="section col-10">
            <label><input type="checkbox" name="sunday" defaultChecked={sunday}/> Sunday</label>
            <label><input type="checkbox" name="monday" defaultChecked={monday}/> Monday</label>
            <label><input type="checkbox" name="tuesday" defaultChecked={tuesday}/> Tuesday</label>
            <label><input type="checkbox" name="wednesday" defaultChecked={wednesday}/> Wednesday</label>
            <label><input type="checkbox" name="thursday" defaultChecked={thursday}/> Thursday</label>
            <label><input type="checkbox" name="friday" defaultChecked={friday}/> Friday</label>
            <label><input type="checkbox" name="saturday" defaultChecked={saturday}/> Saturday</label>
            <br/>
            <label><input type="checkbox" name="morning" defaultChecked={morning}/> Morning</label>
            <label><input type="checkbox" name="afternoon" defaultChecked={afternoon}/> Afternoon</label>
            <label><input type="checkbox" name="evening" defaultChecked={evening}/> Evening</label>
            <br/>
            <label> Hours per week<input type="text" name="hours" defaultValue={hours}/></label>
          </div>
        </div>
    );
  }
}