import React, { Component } from 'react';
import { render } from 'react-dom';
import Sidebar from 'react-sidebar';
import Profile from './Profile';
import Transportation from './Transportation';
import Education from './Education';
import Availability from './Availability';
import Skills from './Skills';
import Interests from './Interests';
import Portfolio from './Portfolio';
import BasicInfoModal from './modal/BasicInfoModal';


/*const items = [
      <SidebarItem>+ Basic Info</SidebarItem>,
      <SidebarItem>+ Transportation</SidebarItem>,
      <SidebarItem>+ Hours</SidebarItem>,
      <SidebarItem>+ Experience</SidebarItem>,
      <SidebarItem>+ Skills</SidebarItem>,
      <SidebarItem>+ Interests</SidebarItem>,
      <SidebarItem>+ Portfolio</SidebarItem>
    ];*/

const mql = window.matchMedia('(min-width: 800px)');
const styles = {
  sidebar: {
    width: 256,
    height: '100%',
  },
  sidebarLink: {
    display: 'block',
    padding: '16px 0px',
    color: '#757575',
    textDecoration: 'none',
  },
  divider: {
    margin: '8px 0',
    height: 1,
    backgroundColor: '#757575',
  },
  content: {
    padding: '16px',
    height: '100%',
    backgroundColor: 'white',
  },
};

export default class CandidatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mql: mql,
      docked: true,
      count: 0,

      user: null
    }
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
  }

  callApi = async () => {
    const response = await fetch('/api/candidate', {credentials: 'include'});
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body[0];
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ user: res }))
      .catch(err => console.log(err));
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql: mql, docked: mql.matches});
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged() {
    this.setState({
      mql: mql,
      docked: this.state.mql.matches,
    });
  }

  render() {
    const sidebarContent =
      <div style={styles.content}>
        <BasicInfoModal style={styles.sidebarLink} data={this.state.user}>+ Basic Info</BasicInfoModal>
        <a onClick={this.transportation_handler} style={styles.sidebarLink}>+ Transportation</a>
        <a onClick={this.hours_handler} style={styles.sidebarLink}>+ Hours</a>
        <a onClick={this.experience_handler} style={styles.sidebarLink}>+ Experience</a>
        <a onClick={this.skills_handler} style={styles.sidebarLink}>+ Skills</a>
        <a onClick={this.interest_handler} style={styles.sidebarLink}>+ Interests</a>
        <a onClick={this.portfolio_handler} style={styles.sidebarLink}>+ Portfolio</a>
      </div>;
    return (
      !this.state.user ?
        <div>Loading...</div>
      :
        <div className="home">
           <Sidebar sidebar={sidebarContent}
                    docked={this.state.docked}>
            <div>
              <div>
                <Profile data={this.state.user}/>
                <Transportation/>
                <Availability/>
                <Education/>
                <Skills/>
                <Interests/>
                <Portfolio/>
              </div>
            </div>
          </Sidebar>
        </div>
    );
  }
}