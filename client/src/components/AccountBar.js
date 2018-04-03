import React, {Component} from 'react';
import './AccountBar.css';

export default class AccountBar extends Component{ 

	constructor(props){
		super(props);
		this.state = {
			name: "temp name"
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e){

	}

	render(){

		return (
		<div class="col-10 main-content">
			<div class="top-bar">
				<p> Hello, {this.state.name}! </p>
				<button type="button" class="account-btn btn" data-container="body" data-toggle="popover" data-placement="bottom" data-content="Hello" onClick={this.handleClick}><img src="./newyork.jpg" class="account-img img-circle"/> </button>
				<button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="bottom" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
  Popover on top
</button>
			</div>
		</div> 
		);
	}
}