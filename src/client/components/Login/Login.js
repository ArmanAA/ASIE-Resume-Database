import React, { Component } from 'react';
import { Alert } from 'reactstrap';

const backgroundColor = {
	backgroundColor: '#46A'
}

export default class Login extends Component {

	render() {
		let url = new URL(window.location.href);
		let params = new URLSearchParams(url.search.slice(1));

		return (
			<div>
			<div className="container-fluid" style={backgroundColor}>
				<div className="row">
					<div className="col-12">
						<div>
							<a href='/' > <img alt="Logo" src='/assets/images/logo.png' width="200" /> </a>
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				
				{
					(params.get('signup') != null) ?
							<Alert color="success">
								Sign up was successful! Please login.
							</Alert>
					:
						<span/>
				}
				{
					(params.get('error') != null) ?
							<Alert color="danger">
								Login credientials were not found
							</Alert>
					:
						<span/>
				}
				<div className="row">
					<form className="col-md-6 offset-md-3 border border-info rounded form-box" action="/login" method="post">
						<h1>Login</h1>
						<div className="form-group">
						<div>
							<label>Email:</label>
							<input  className="form-control"type="text" name="email"/>
						</div>
						<div>
							<label>Password:</label>
							<input className="form-control" type="password" name="password"/>
						</div>
						<div>
							<input className="form-control btn btn-primary" type="submit" value="Log In"/>
						</div>
						</div>
					</form>
				</div>
			</div>
			</div>
		);
	}
}