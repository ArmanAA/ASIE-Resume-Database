import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import Profile from './Profile';
import Disability from './Disability';
import Support from './Support';
import Transportation from './Transportation';
import Experience from './Experience'
import Hours from './Hours';
import Skills from './Skills';
import Interests from './Interests';
import Portfolio from './Portfolio';
import BasicInfoModal from './modal/BasicInfoModal';
import DisabilityModal from './modal/DisabilityModal';
import SupportModal from './modal/SupportModal';
import TransportationModal from './modal/TransportationModal';
import ExperienceModal from './modal/ExperienceModal';
import HoursModal from './modal/HoursModal';
import SkillsModal from './modal/SkillsModal';
import InterestModal from './modal/InterestModal';
import PortfolioModal from './modal/PortfolioModal';
import MaterialTitlePanel from './MaterialTitlePanel';
import { Button, Navbar, NavbarToggler } from 'reactstrap';
import AccountBar from '../AccountBar';

const mql = window.matchMedia('(min-width: 768px)');
const styles = {
	sidebar: {
		width: 256,
		height: 'auto',
	    minHeight: '100vh',
	    backgroundColor: '#494D55',
	    textAlign: 'center'
	},
	sidebarLink: {
		display: 'block',
		padding: '16px 0px',
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
			disability: null,
			support: null,
			experience: null,
			education: null,
			skills: null,
			interest: null,
			hours: null,
			transportation: null,
			portfolio: null,
			id: this.props.match.params.id
		}
		this.componentDidMount = this.componentDidMount.bind(this);
		this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
		this.toggleOpen = this.toggleOpen.bind(this);
		this.onSetOpen = this.onSetOpen.bind(this);
	}

	callApi = async (url, state_id) => {
		const response = await fetch(url, {credentials: 'include'});
		const body = await response.json();

		if (response.status !== 200) throw Error(body.message);
		this.setState({[state_id]: body});
	};

	componentDidMount() {
		this.callApi('/api/candidates/profiles/' + this.state.id, 'profile');
		this.callApi('/api/candidates/disabilities/' + this.state.id, 'disability');
		this.callApi('/api/candidates/supports/' + this.state.id, 'support');
		this.callApi('/api/candidates/experiences/' + this.state.id, 'experience');
		this.callApi('/api/candidates/skills/' + this.state.id, 'skills');
		this.callApi('/api/candidates/interests/' + this.state.id, 'interest');
		this.callApi('/api/candidates/hours/' + this.state.id, 'hours');
		this.callApi('/api/candidates/transportations/' + this.state.id, 'transportation');
		this.callApi('/api/candidates/portfolios/' + this.state.id, 'portfolio');
		fetch('/api/users/userinfo',{
			headers:{"Content-Type": "application/json"},
			method:'post',
			credentials: 'include'
		}).then(response => {
			response.json().then(json => {
				if(json.usertype !== "CAND" && json.usertype != null){
					fetch('/api/emaillist/exists', {
						method:'post',
						credentials: 'include'
					}).then(res => {
						res.json().then(json=>{
							this.setState({
								subscribed: json.subscribe
							})
						})
					});
				}
				this.setState({
					user: json
				})
			});
		});
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
		<MaterialTitlePanel title="Describe Yourself!" style={styles.sidebar}>
			<div>
				<BasicInfoModal style={styles.sidebarLink} data={this.state.profile} id={this.state.id}></BasicInfoModal>
				<DisabilityModal style={styles.sidebarLink} data={this.state.disability} id={this.state.id}></DisabilityModal>
				<SupportModal style={styles.sidebarLink} data={this.state.support} id={this.state.id}></SupportModal>
				<TransportationModal style={styles.sidebarLink} data={this.state.transportation} id={this.state.id}></TransportationModal>
				<HoursModal style={styles.sidebarLink} data={this.state.hours} id={this.state.id}></HoursModal>
				<ExperienceModal style={styles.sidebarLink} data={this.state.experience} id={this.state.id}></ExperienceModal>
				<SkillsModal style={styles.sidebarLink} data={this.state.skills} id={this.state.id}></SkillsModal>
				<InterestModal style={styles.sidebarLink} data={this.state.interest} id={this.state.id}></InterestModal>
				<PortfolioModal style={styles.sidebarLink} data={this.state.portfolio} id={this.state.id}></PortfolioModal>
			</div>
		</MaterialTitlePanel>;

		return (
			!this.state.profile ?
				<div>Loading...</div>
			:
				<div className="home">
					<Sidebar sidebar={sidebarContent} docked={this.state.docked} open={this.state.open} onSetOpen={this.onSetOpen}>
						{
							this.state.docked ? <span></span> :
							
							<Navbar style={{backgroundColor: "#4EB9BE"}}>
								<Button style={{backgroundColor: "#4EB9BE"}} onClick={this.toggleOpen.bind(this)}>=</Button>
							</Navbar>
						}
						<AccountBar user={this.state.user}/>
							<div>
								<div className="mainpage" style={{maxWidth: 1000}}>
									<Profile data={this.state.profile}/>
									<Support data={this.state.support}/>
									<Disability data={this.state.disability}/>
									<Transportation data={this.state.transportation}/>
									<Hours data={this.state.hours}/>
									<Experience data={this.state.experience}/>
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