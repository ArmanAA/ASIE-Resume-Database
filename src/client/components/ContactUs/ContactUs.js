import React, { Component } from "react";
import { Alert, Container, Row, Col } from 'reactstrap';
import MenuBar from "../Home/MenuBar.js";
import "./assets/ContactUs.css";

export default class ContactUs extends Component {
	componentDidMount() {
		document.title = "Contact Us - ASIE Resume Database";
	}

	render() {
		let url = new URL(window.location.href);
		let params = new URLSearchParams(url.search.slice(1));

		return (
			<div>
				<MenuBar/>
				<div className="bg1">
						<div className="row">
							<div className="col title">
								<h1>Contact Us</h1>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<p>Individuals with disabilities face challenges every day and are accustomed to working harder to demonstrate their abilities. It may surprise you to learn that people with disabilities now represent 10-20% of the population, an influential market that continues to grow with the aging of America.<br/><br/>
								Studies show that people with disabilities are more loyal to their employers and tend to stay on their jobs longer. Consider that employee turnover can cost up to 200%.  Save money, enhance productivity, and gain access to a largely untapped source of hard-working and qualified job candidates.<br/><br/>
								Contact us today to learn more about this untapped workforce.</p>
							</div>
						</div>
					</div>
					

					<div className="row">
						<form className="col-6 form-background" action="/contactus" method="post">
							<div className="row">
								<div className="col">
									{
										(params.get('success') != null) ?
												<Alert color="success">
													Success! Your message has been sent.
												</Alert>
										:
											<span/>
									}
									{
										(params.get('error') != null) ?
												<Alert color="danger">
													Failed. Please try again later.
												</Alert>
										:
											<span/>
									}
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<label>First Name</label>
									<input className="form-control" type="text" name="firstName"/>
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<label>Last Name</label>
									<input className="form-control" type="text" name="lastName"/>
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<label>Email</label>
									<input className="form-control" type="text" name="email" />
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<label>Subject</label>
									<input className="form-control" type="text" name="subject"/>
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<label>Message</label>
									<textarea className="form-control" rows="5" name="message"/>
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<b>If I am agreeing on the behalf of my company, I represent and warrant that I have legal authority to bind my company to the <a href="/waiver" target="_blank">terms of the agreement.</a></b>
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<input className="btn btn-primary" type="submit" value="Submit"/>
								</div>
							</div>
						</form>
						<div className="col-6 d-flex align-items-center">
							<img src={require("./assets/background.jpg")}/>
						</div>

				</div>
			</div>
		);
	}
}
