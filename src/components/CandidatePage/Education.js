import React, { Component } from 'react';

export default class Education extends Component {
  render() {
    const educaiton_history = [
      {
        "school":"University?",
        "degree":"Masters in Beer tasting",
        "graduated":"April 2007",
        "description":"Describe your experience at school, what you learned, what useful skills you have acquired etc."
      },
      {
        "school":"School #1 Maybe College?",
        "degree":"What did you study 101",
        "graduated":"March 2003",
        "description":"Describe your experience at school, what you learned, what useful skills you have acquired etc."
      }
    ];

    var education = educaiton_history.map(function(education){
      return <div key={education.school}><h3>{education.school}</h3>
      <p className="info">{education.degree} <span>&bull;</span><em className="date">{education.graduated}</em></p>
      <p>{education.description}</p></div>
    })

    return (
      <div className="row">
        <div className="three columns header-col">
          <h1><span>Education</span></h1>
        </div>

        <div className="nine columns main-col info-box">
          <div className="row item">
            <div className="twelve columns">
              {education}
            </div>
          </div>
        </div>
      </div>
    );
  }
}