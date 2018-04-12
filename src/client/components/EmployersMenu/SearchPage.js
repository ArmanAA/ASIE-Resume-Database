import React, { Component } from 'react';
import styles from './SearchPage.css';
import ProfileList from './ProfileList';
import { Button } from 'reactstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


const mql = window.matchMedia('(min-width: 800px)');

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mql: mql,
      docked: true,
      open: false,
      count: 0,
      user: null,
      profile: []
    }
    // populate table
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.search("", "");
    fetch('/api/search/candidate/options', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => {
      return res.json();
    }).then(json => {
      if (json) {
        this.setState({interestOptions: json.interests, locationOptions: json.locations});
      }
    })
  }

  handleChangeInterest = (selectedOption) => {
    this.setState({interest: selectedOption});
    if (!this.state.interest && !this.state.location) {
      this.search("", "");
    }
  }

  handleChangeLocation = (selectedOption) => {
    this.setState({location: selectedOption});
    if (!this.state.interest && !this.state.location) {
      this.search("", "");
    }
  }

  search(interest, location) {
    const self = this;
    var url = '/api/search/candidate?' + "interests=" + interest + "&locations=" + location;
    fetch(url, {
      method: 'GET',
      credentials: 'include'
    }).then(response => {
      response.json().then(json => {
        console.log("SearchPage", json);
        if(json) {
          self.setState({profile: json});
        }
      })
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    
    let interest = this.state.interest ? this.state.interest.value : "";
    let location = this.state.location ? this.state.location.value : "";

    this.search(interest, location);
    
  }

  render() {

    return (

        <div>
					<div className="container">
                <div className="row">
                  <form className="col-12" onSubmit={this.handleSubmit}>
                    <div className="row">
                      <div className="col-12">
                        <Select
                          
                          value={this.state.interest}
                          placeholder="Search by interest"
                          onChange={this.handleChangeInterest}
                          options={this.state.interestOptions}
                          name="interests"

                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <Select
                          value={this.state.location}
                          placeholder="Search by location"
                          onChange={this.handleChangeLocation}
                          options={this.state.locationOptions}
                          name="locations"

                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <Button color="primary" type="submit">Search</Button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="row">
                  <div className="col">
                    <ProfileList data={this.state.profile}/>
                  </div>
                </div>
              </div>
				  
        </div>
    );
  }
}