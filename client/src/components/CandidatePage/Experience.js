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
          <h4>{job.title}</h4>
          <h5>{job.company}</h5>
          <ul>
            <li>{job.from} - {job.currently ? "Present" : job.to}</li>
            <li>{job.description}</li>
          </ul>
        </div>
      });
    }
    return (
      !this.props.data ?
        <span></span>
      :
        <div className="row">
          <div className="col-3 section-title">
            <h1><span>Experience</span></h1>
          </div>
          <div className="col-10 section">
            {experiencelist}
          </div>
        </div>
    );
  }
}