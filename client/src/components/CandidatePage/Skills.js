import React, { Component } from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'

export default class Skills extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: props.data
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({tags: nextProps.data});
  }

  handleChange(tags) {
      this.setState({tags})
  }

  render() {
    return (
      !this.state.tags ?
        <span></span>
      :
      <div>
        <div className="row">
          <div className="col-3 section-title">
            <h1><span>Skills</span></h1>
          </div>
          </div>
          <div>
          <div className="col-10 section">
            <TagsInput
              value={this.state.tags}
              onChange={this.handleChange.bind(this)}
              inputProps={{className: 'react-tagsinput-input',  placeholder: 'Enter skills'}}
            />
          </div>
        </div>
        </div>
    );
  }
}