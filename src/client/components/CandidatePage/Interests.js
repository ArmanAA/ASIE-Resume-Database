import React, { Component } from 'react';
import 'react-tagsinput/react-tagsinput.css'

export default class Interests extends Component {
	constructor(props) {
		super(props)

		if(props.data) {
			var personal = props.data.personal_interest || [];
			var career = props.data.career_interest || [];
		}

		this.state = {
			personal_tags: personal,
			career_tags: career
		}
		this.handleChangePersonal.bind(this);
		this.handleChangeCareer.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.data) {
			this.setState({
				personal_tags: nextProps.data.personal_interest,
				career_tags: nextProps.data.career_interest
			})
		}
	}

	handleChangePersonal(tags) {
		this.setState({personal_tags: tags})
	}

	handleChangeCareer(tags) {
		this.setState({career_tags: tags})
	}

	render() {
		if(this.state.personal_tags) {
			var personal_list = this.state.personal_tags.map((tag) => {
				return <li>{tag}</li>
			});
		}
		if(this.state.career_tags) {
			var career_list = this.state.career_tags.map((tag) => {
				return <li>{tag}</li>
			});
		}


		return (
			(!this.state.personal_tags || this.state.personal_tags.length === 0) &&
			(!this.state.career_tags || this.state.career_tags.length === 0) ?
				<span></span>
			:
				<div className="row">
					<div className="col-3 section-title">
						<h1><span>Interests</span></h1>
					</div>
					<div className="col-10 section">
						{
							!this.state.personal_tags || this.state.personal_tags.length === 0 ? <span></span> :
							<span>
								<b>What do you like to do for fun?</b><br/>
								<ul>
								{personal_list}
								</ul>
							</span>
						}
						{
							!this.state.career_tags || this.state.career_tags.length === 0 ? <span></span> :
							<span>
								<b>What jobs are you interested in?</b><br/>
								<ul>
								{career_list}
								</ul>
							</span>
						}
						
					</div>
				</div>

		);

	}
}