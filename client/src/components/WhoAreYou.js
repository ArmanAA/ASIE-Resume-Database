import React, { Component } from 'react';
import MultiselectTwoSides from 'react-multiselect-two-sides';
import './_tempcss/whoareyou.css';

export default class WhoAreYou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personal_interests: [
        "Animals",
        "Art",
        "Computers",
        "Construction",
        "Movies",
        "Music",
        "Politics",
        "Transportation",
        "Self-Advocacy",
        "Video Games"
      ],
      career_interests: [
        {name: "Accounting", value: 1},
        {name: "Administrative", value: 2}
      ],
      career_interests_selected: []
    }
  }

  handleChange = (value) => {
    this.setState({career_interests_selected: value});
  }

  render() {
    if(this.state.personal_interests) {
      var personal_interests_options = this.state.personal_interests.map((option) => {
        return <div key={option}>
            <label><input type="checkbox"/> {option}</label>
          </div>
      });
    }
    return (
      <div className="container">
        <div className="row">
        <div className="col-12 whoareyou">
          <h1>Who are you?</h1>
        </div>
        <div className="col-12 interests">
          <h3>Personal Interests</h3>
          <p>We believe there are people out there who are interested in the same things that interest you. What are areas that you may be or are interested in working?</p>
          {personal_interests_options}
          <h3>Career Interests</h3>
          <MultiselectTwoSides
            options={this.state.career_interests}
            value={this.state.career_interests_selected}
            onChange={this.handleChange}
            availableHeader="Available"
            selectedHeader="Selected"
            labelKey="name"
            showControls
            searchable
          />
          </div>
        </div>
      </div>
    );
  }
}