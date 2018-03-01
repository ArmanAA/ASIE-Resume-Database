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
      var experiencelist = this.state.data.map((job) => {
        return <div key={job.title}>
          <h3>{job.title}</h3>
          <h4>{job.company}</h4>
          <p>{job.from} - {job.currently ? "Present" : job.to}</p>
          <p>{job.description}</p>
        </div>
      });
    }
    return (
      !this.props.data ?
        <span></span>
      :
        <div className="row">
          <div className="three columns header-col">
            <h1><span>Experience</span></h1>
          </div>
          <div className="nine columns main-col">
            {experiencelist}
          </div>
        </div>
    );
  }
}