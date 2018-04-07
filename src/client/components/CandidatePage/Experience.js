import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';



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
					<Container fluid={true}>
						<Row>
							<Col sm="8">
								<h5>{job.title}</h5>
							</Col>
							<Col sm="4">
								<h5>{job.from} - {job.currently ? "Present" : job.to}</h5>
							</Col>
						</Row>
						<Row>
							<Col>
								<h6>{job.company}</h6>
							</Col>
						</Row>
						<Row>
							{
								job.description ?
									<Col>
										<p>{job.description}</p>
									</Col>
								:
								<span></span>
							}
						</Row>
					</Container>
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