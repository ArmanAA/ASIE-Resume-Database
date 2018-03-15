import React, { Component } from 'react';
import 'react-tagsinput/react-tagsinput.css'

export default class Skills extends Component {
  constructor(props) {
    super(props)
    this.state = {
      skills: props.data || []
    }
  }

  handleSubmit(type, skill) {
    fetch('/api/candidate/update/skills', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({type: type, skill: skill}),
      credentials: 'include'
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({skills: nextProps.data});
  }

  handleAdd(item) {
    console.log(item);
    this.handleSubmit("add", item);
  }

  handleRemove(item) {
    console.log(item);
    this.handleSubmit("remove", item);
  }

  handleChange(tags, changed, changedIndexes) {
    console.log("tags", tags);
    console.log("changed", changed);
    console.log("changedIndexes", changedIndexes);
    this.setState({skills: tags});
    //added
    for(var i=0; i<changed.length; i++) {
      if(tags[changedIndexes[i]] === changed[i]) {
        this.handleAdd(changed[i]);
      }
      else {
        this.handleRemove(changed[i]);
      }
    }
  }

  render() {
    if(this.state.skills) {
      var skills = this.state.skills.map((skill) => {
        return <li key={skill}>{skill}</li>
      });
    }
    return (
      !this.state.skills || this.state.skills.length === 0 ?
        <span></span>
      :
        <div className="row">
          <div className="col-3 section-title">
            <h1><span>Skills</span></h1>
          </div>
          <div className="col-10 section">
            <ul>
              {skills}
            </ul>
          </div>
        </div>
    );
  }
}