import React, {Component} from 'react';
import './assets/MenuBar.css';

export default class MenuBar extends Component {
	

	render(){
		return(
				<div className="topbar container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="ASIE">
								<a href='/' > <img alt="Logo" src='./assets/images/logo.png' width="200" /> </a>
							</div>
							<form action="/login" method="POST">
								<input className="text-field" type="text" placeholder="email" name="email"></input>
								<input className="text-password" type="password>" placeholder="password" name="password"></input>
								<button className="btn btn-custom" type="submit"> Sign in</button>
							</form>

						</div>
					</div>
				</div>
			)

	}


}