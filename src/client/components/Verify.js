import React, {Component} from 'react';
import { Alert,  } from 'reactstrap';
import MenuBar from "./Home/MenuBar.js";
import "./Signup/css/Signup.css";
import { FormGroup, Input, FormFeedback } from 'reactstrap';


export default class Verify extends Component {
	
	constructor(props){
		 super(props);
		 this.state={
			invalid:false
		 }
	}


 	componentDidMount() {
		document.title = "Reset Password - ASIE Resume Database";
	}

	render() {

		let url = new URL(window.location.href);
		let params = new URLSearchParams(url.search.slice(1));

		return (
			<div>
				<MenuBar />
				<div className="container">
					{
						(params.get('invalid') != null) ?
							<Alert color="danger">
								This link is invalid. 
							</Alert>
						:
							<span/>
					}{
						(params.get('success') != null) ?
							<Alert color="success">
								Success! Log in with your new credentials. 
							</Alert>
						:
							<span/>
					}{
						(params.get('timeout') != null) ?
							<Alert color="danger">
								This link has expired. 
							</Alert>
						:
							<span/>
					}{
						(params.get('confirmpass') != null) ?
							<Alert color="danger">
								Password is less than 8 characters or confirm password does not match. Please try again. 
							</Alert>
						:
							<span/>
					}
					
					<div className="row">
						<form className="col-md-6 offset-md-3 border border-info rounded form-box"  method="post">
							<div className="form-group">
								<h1>Reset Password</h1>
								<div>
									<label>Enter new password</label>
									<input className="form-control" type="password" name="password" required/>
									<label>Confirm your new password</label>
									<input className="form-control" type="password" name="confirm" required/>
								</div>
						
								<div>
									<input
										className="btn btn-primary"
										type="submit"
										value="Submit"
									/>
								</div>
							</div>
						</form>
					</div>
				</div>{" "}
				{/*container*/}
			</div> /*Empty div to wrap JSX*/
		);
	}
}