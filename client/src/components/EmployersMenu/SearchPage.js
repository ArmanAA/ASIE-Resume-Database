import React, { Component } from 'react';
import styles from './SearchPage.css';
import ProfileList from './ProfileList';


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
    const data = new FormData(event.target);
    this.search(event.target.interests.value, event.target.locations.value);
  }

  render() {

    return (

        <div>
					<div className="container">
						<div className="row">
							<form className="col-12" onSubmit={this.handleSubmit}>
								<div className="input-group">
									<input type="text" name="interests" className="form-control col-sm-8" placeholder="Search by interests"/>
									<input type="text" name="locations" className="form-control col-sm-8" placeholder="Search by locations"/>
									<input className="btn btn-default mb-2 col-sm-2 mx-1" type="submit" value="Search"/>
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