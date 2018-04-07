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
import ExperienceModal from './modal/ExperienceModal';
import HoursModal from './modal/HoursModal';
import SkillsModal from './modal/SkillsModal';
import InterestModal from './modal/InterestModal';
import PortfolioModal from './modal/PortfolioModal';
import MaterialTitlePanel from './MaterialTitlePanel';
import { Jumbotron, Button } from 'reactstrap';


const mql = window.matchMedia('(min-width: 800px)');
const styles = {
	sidebar: {
		width: 256,
		height: '100%',
		backgroundColor: '#111'
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
		backgroundColor: '#111',
	},
	contentHeaderMenuLink: {
		textDecoration: 'none',
		color: 'white',
		padding: 8,
	},
};

export default class CandidatePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mql: mql,
			docked: true,
			open: false,
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
		this.toggleOpen = this.toggleOpen.bind(this);
		this.onSetOpen = this.onSetOpen.bind(this);
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

	onSetOpen(open) {
		this.setState({open: open});
	}

	mediaQueryChanged() {
		this.setState({
			mql: mql,
			docked: this.state.mql.matches,
		});
	}
  
	toggleOpen(ev) {
		this.setState({open: true});

		if (ev) {
			ev.preventDefault();
		}
	}

	render() {
		const sidebarContent =
		<MaterialTitlePanel title="Describe Yourself More!" style={styles.content}>
			<div>
				<BasicInfoModal style={styles.sidebarLink} data={this.state.profile}></BasicInfoModal>
				<TransportationModal style={styles.sidebarLink} data={this.state.transportation}></TransportationModal>
				<HoursModal style={styles.sidebarLink} data={this.state.hours}></HoursModal>
				<ExperienceModal style={styles.sidebarLink} data={this.state.experience}></ExperienceModal>
				<SkillsModal style={styles.sidebarLink} data={this.state.skills}></SkillsModal>
				<InterestModal style={styles.sidebarLink} data={this.state.interest}></InterestModal>
				<PortfolioModal style={styles.sidebarLink} data={this.state.portfolio}></PortfolioModal>
			</div>
		</MaterialTitlePanel>;

		const contentHeader = (
			<span>
				{!this.state.docked &&
					<a onClick={this.toggleOpen.bind(this)} style={styles.contentHeaderMenuLink}>☰</a>}
				<span> Menu </span>
			</span>);
		return (
			!this.state.profile ?
				<div>Loading...</div>
			:
				<div className="home">
					<Sidebar sidebar={sidebarContent} docked={this.state.docked} open={this.state.open} onSetOpen={this.onSetOpen}>
						<MaterialTitlePanel title={contentHeader}>
							<div>
								<div className="mainpage" style={{maxWidth: 1000}}>
									<Profile data={this.state.profile}/>
									<Transportation data={this.state.transportation}/>
									<Hours data={this.state.hours}/>
									<Experience data={this.state.experience}/>
									<Skills data={this.state.skills}/>
									<Interests data={this.state.interest}/>
									<Portfolio data={this.state.portfolio}/>
								</div>
							</div>
						</MaterialTitlePanel>
					</Sidebar>
				</div>
		);
	}
}