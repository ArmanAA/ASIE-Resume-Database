import React, { Component } from 'react';
import { Alert, FormText, FormFeedback, Input } from 'reactstrap';
import MenuBar from '../Home/MenuBar.js'
import './css/Signup.css';

export default class Login extends Component {

	constructor(props){
		super(props);
		this.state={
			invalid: false
		}
		this.validatePassword = this.validatePassword.bind(this);
	}
	componentDidMount(){
		document.title = "Register - ASIE Resume Database"

	}

	validatePassword(e){
		this.setState({
			invalid: (e.target.value.length < 8)
		})
	}
	render() {
		let url = new URL(window.location.href);
		let params = new URLSearchParams(url.search.slice(1));
		return (
				<div>
					 <MenuBar/>

				<div className="container">

				{
					(params.get('email') != null) ?
						<Alert color="danger">
							This email is already registered! Please try another one.
						</Alert>
					:
						<span/>
				}
				{
					(params.get('error') != null) ?
						<Alert color="danger">
							An error has occured. Please try again later.
						</Alert>
					:
						<span/>
				}{
					(params.get('password') != null) ?
						<Alert color="danger">
							Make sure password is at least 8 characters.
						</Alert>
					:
						<span/>
				}

				<div className="row">
					<form className="col-md-6 offset-md-3 border border-info rounded form-box" action="/signup" method="post">
						<div className="form-group">
							<h1>Registration</h1>
							<div>
								<label>First Name:</label>
								<input className="form-control" type="text" name="firstName" required/>
							</div>
							<div>
								<label>Last Name:</label>
								<input className="form-control" type="text" name="lastName" required/>
							</div>
							<div>
								<label>Email:</label>
								<input className="form-control" type="text" name="email" required/>
							</div>
							<div>
								<label>Password:</label>
								<Input invalid={this.state.invalid} className="form-control" type="password" name="password" onChange={this.validatePassword} required/>
								<FormFeedback invalid={this.state.invalid} > Password must be at least 8 characters. </FormFeedback>
								<FormText> * Password must be at least 8 characters. </FormText>
								
							</div>
							<div>
								<label className="checkbox-inline"> 
									<input type="checkbox" name="terms" required/>
									By checking this box I confirm that I have read and agree to be bound by  <a href="/waiver" target="_blank">this agreement</a>. I also confirm that I am of the legal age of 18.
								</label>
							</div>
							<div>
								<input className="btn btn-primary" type="submit" value="Sign Up"/>
							</div>
							</div>
						</form>
				</div> {/*col-8*/}
				</div> {/*container*/}
				</div> /*Empty div to wrap JSX*/
		);
	}
}