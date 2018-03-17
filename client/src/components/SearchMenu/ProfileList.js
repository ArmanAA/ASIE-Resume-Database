import React, { Component } from 'react';
import Profile from './Profile';
import styles from './SearchPage.css';

export default class ProfileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      console.log("ProfileList", nextProps.data);
      this.setState({
        profile: nextProps.data
      })
    }
  }

  render() {
    return (
      <ul className="profile-list">
        { this.state.profile.map( (profile) => <Profile {...profile} /> ) }
      </ul>
    );
  }
}
