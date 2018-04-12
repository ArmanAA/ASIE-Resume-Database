import React, {Component} from 'react';
import './assets/MenuBar.css';

export default class MenuBar extends Component {
	

	render(){
		return(
				<div className="topbar container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="ASIE mt-1">
								<a href='/' > <img alt="Logo" src='/assets/images/logo.png' width="200" /> </a>
							</div>
							<div className='col-5 float-right'>
							<div className="row">
							<form className="mb-0 mt-1 py-0" action="/login" method="POST">
								<input className=" order-1 text-field form-control" type="text" placeholder="email" name="email"></input>	
								<input className="order-2 text-password form-control" id="pwd" type="password" placeholder="password" name="password"></input>
								<button className="order-3 btn btn-custom btn-menu" type="submit"> Sign in</button>	
							</form>
							</div>
							<div className="row mx-2">
								<a className="text-white" href='/forgot'><small> Forgot Password? </small> </a>

							</div>
							</div>
							
 						</div>
					</div>
				</div>
			)

	}


}