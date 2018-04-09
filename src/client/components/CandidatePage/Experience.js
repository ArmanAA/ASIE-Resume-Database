import React, { Component } from 'react';



export default class Education extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: props.data
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({data: nextProps.data});
	}
	
	render() {
		if(this.state.data) {
			var experiencelist = this.state.data.map((job) => {
				return <div key={job.title}>
					<hr/>
						<div className="row">
							<div className="col-sm-8">
								<h5>{job.title}</h5>
							</div>
							<div className="col-sm-4">
								<h5>{job.from} - {job.currently ? "Present" : job.to}</h5>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<h5>{job.company}</h5>
							</div>
						</div>
						{
							job.description ?
								<div className="row">
									<div className="col">
										<p>{job.description}</p>
									</div>
								</div>
							:
							<span></span>
						}
					<hr/>
				</div>
			});
		}
		return (
			!this.state.data || this.state.data.length === 0 ?
				<span></span>
			:
					<div className="row">
						<div className="col-3 section-title">
							<h1><span>Experience</span></h1>
						</div>
						<div className="col-10 section">
							{experiencelist}
						</div>
					</div>
		);
	}
}