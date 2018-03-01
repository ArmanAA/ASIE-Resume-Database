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
							<form method="POST">
								<input className="text-field" type="text" placeholder="email"></input>
								<input className="text-field" type="text>" placeholder="password"></input>
								<button className="btn btn-custom" type="submit"> Sign in</button>
							</form>

						</div>
					</div>
				</div>
			)

	}


}