import React, { Component } from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'

export default class Interests extends Component {
  constructor(props) {
    super(props)
    this.state = {
      personal_tags: props.data ? props.data.personal_interest : [],
      career_tags: props.data ? props.data.career_interest : []
    }
    this.handleChangePersonal.bind(this);
    this.handleChangeCareer.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data) {
      this.setState({
        personal_tags: nextProps.data.personal_interest,
        career_tags: nextProps.data.career_interest
      })
    }
  }

  handleChangePersonal(tags) {
    this.setState({personal_tags: tags})
  }

  handleChangeCareer(tags) {
    this.setState({career_tags: tags})
  }

  render() {
    return (
      !this.props.data ?
        <span></span>
      :
        <div className="row">
          <div className="col-3 section-title">
            <h1><span>Interests</span></h1>
          </div>
          <div className="col-10 section">
            <h4>Personal</h4>
            <TagsInput
              value={this.state.personal_tags}
              onChange={this.handleChangePersonal}
              inputProps={{className: 'react-tagsinput-input',  placeholder: 'Enter interests'}}
            />
            <h4>Career</h4>
            <TagsInput
              value={this.state.career_tags}
              onChange={this.handleChangeCareer}
              inputProps={{className: 'react-tagsinput-input',  placeholder: 'Enter interests'}}
            />
          </div>
        </div>
    );
  }
}