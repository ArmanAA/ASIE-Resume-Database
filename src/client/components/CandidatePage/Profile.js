import React, { Component } from 'react';

const regional = {
	"yes": "Yes",
	"no": "No",
	"idk": "I don't know"
}

export default class ProfileComponent extends Component {
	constructor(props) {
		super(props);
		this.componentWillReceiveProps(props);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.data) {
			this.setState({
				profilepic: "/profile/" + nextProps.data.profilepic,
				fname: nextProps.data.fname,
				lname: nextProps.data.lname,
				street: nextProps.data.street,
				city: nextProps.data.city,
				state: nextProps.data.state,
				zip: nextProps.data.zip,
				phone: nextProps.data.phone,
				email: nextProps.data.email,
				regionalclient: nextProps.data.regionalclient,
				rehabclient: nextProps.data.rehabclient,
				conditions: nextProps.data.conditions
			});
		}
	}

	render() {
		return (
			!this.state ?
				<span></span>
			:
				<div className="row">
					<div className="col-3 section-title">
						<h1><span>About Me</span></h1>
					</div>
						<div className="section col-10">
							<div className="row">
								<div className="profile-pic col-sm-4">
									{this.state.profilepic ? <img src={this.state.profilepic} alt="Profile Pic" /> : <span></span>}
								</div>
								<div className='col-sm-6'>
									<h1> {this.state.fname} {this.state.lname} </h1>
									{
										this.state.city ?
										<div className='row'>
											<div className='col'>
												<p>{this.state.city} </p>
											</div>
										</div>
										:
										<span></span>
									}
									{
										this.state.phone ?
										<div className='row'>
											<div className='col'>
												<p>{this.state.phone}</p>
											</div>
										</div>
										:
										<span></span>
									}
									{
										this.state.email ?
										<div className='row'>
											<div className='col'>
												<p>{this.state.email}</p>
											</div>
										</div>
										:
										<span></span>
									}
									{
										this.state.regionalclient ?
										<div className='row'>
											<div className='col'>
												<p>Regional Center Client? {regional[this.state.regionalclient]}</p>
											</div>
										</div>
										:
										<span></span>
									}
									{
										this.state.rehabclient ?
										<div className='row'>
											<div className='col'>
												<p>Department of Rehabilitation Client? {regional[this.state.rehabclient]}</p>
											</div>
										</div>
										:
										<span></span>
									}
									{
										this.state.conditions_list && this.state.conditions_list.length > 0 ?
										<div className='row'>
											<div className='col'>
												<p>Disabilities:<br/>{this.state.conditions_list}</p>
											</div>
										</div>
										:
										<span></span>
									}
								</div>
							</div>
						</div>
				</div>
		);
	}
}