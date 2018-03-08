import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import Profile from './Profile';
import Transportation from './Transportation';
import Experience from './Experience'
import Hours from './Hours';
import Skills from './Skills';
import Interests from './Interests';
import Portfolio from './Portfolio';
import BasicInfoModal from './modal/BasicInfoModal';
import TransportationModal from './modal/TransportationModal';
import HoursModal from './modal/HoursModal';
import SkillsModal from './modal/SkillsModal';
import InterestModal from './modal/InterestModal';
import PortfolioModal from './modal/PortfolioModal';
import '../../default.css';

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

      user: null,
      profile: null,
      experience: null,
      education: null,
      skills: null,
      interest: null,
      hours: null,
      transportation: null,
      portfolio: null
    }
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
  }

  callApi = async (url, state_id) => {
    const response = await fetch(url, {credentials: 'include'});
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    //console.log(body);
    this.setState({[state_id]: body});
  };

  componentDidMount() {
    this.callApi('/api/candidate/profile', 'profile');
    this.callApi('/api/candidate/experience', 'experience');
    this.callApi('/api/candidate/education', 'education');
    this.callApi('/api/candidate/skills', 'skills');
    this.callApi('/api/candidate/interest', 'interest');
    this.callApi('/api/candidate/hours', 'hours');
    this.callApi('/api/candidate/transportation', 'transportation');
    this.callApi('/api/candidate/portfolio', 'portfolio');
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
        <BasicInfoModal style={styles.sidebarLink} data={this.state.profile}></BasicInfoModal>
        <TransportationModal style={styles.sidebarLink} data={this.state.transportation}></TransportationModal>
        <a onClick={this.experience_handler} style={styles.sidebarLink}>+ Experience</a>
        <HoursModal style={styles.sidebarLink} data={this.state.hours}></HoursModal>
        <SkillsModal style={styles.sidebarLink} data={this.state.skills}></SkillsModal>
        <InterestModal style={styles.sidebarLink} data={this.state.interest}></InterestModal>
        <PortfolioModal style={styles.sidebarLink} data={this.state.portfolio}></PortfolioModal>
      </div>;
    return (
      !this.state.profile ?
        <div>Loading...</div>
      :
        <div className="home">
           <Sidebar sidebar={sidebarContent}
                    docked={this.state.docked}>
            <div>
              <div>
                <Profile data={this.state.profile}/>
                <Transportation data={this.state.transportation}/>
                <Experience data={this.state.experience}/>
                <Hours data={this.state.hours}/>
                <Skills data={this.state.skills}/>
                <Interests data={this.state.interest}/>
                <Portfolio data={this.state.portfolio}/>
              </div>
            </div>
          </Sidebar>
        </div>
    );
  }
}