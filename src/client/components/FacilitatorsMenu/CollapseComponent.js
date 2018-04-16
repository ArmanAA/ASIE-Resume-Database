import React, {Component} from 'react';
import {Collapse, Button, CardBody, Card} from 'reactstrap';


export default class CollapseComponent extends Component{

	constructor(props){
		super(props);
		this.state = {
			open: false
		}
	
		this.toggleOpen = this.toggleOpen.bind(this);


	}

	toggleOpen(ev) {
	    this.setState( {open: !this.state.open});
	    if (ev) {
	      ev.preventDefault();
	    }
	  }

	render(){
		var items = this.props.list.entry;
		var li = items.map(({userId, firstName, lastName})=>
        <a href={"/candidate/" + JSON.stringify(userId)} className="list-group-item list-group-item-action list-group-item-dark"> 
        {firstName} {lastName} </a>);


		return(
		<div>
		<div className={this.props.customClass, "border rounded m-auto"} onClick={this.toggleOpen.bind(this)}>
			<h5 className="my-auto p-2"> {this.props.list.name }</h5>
		</div>
		<Collapse isOpen={this.state.open}> 
		<div className="list-group list-group-flush">
			{li}
		</div>
		</Collapse>
		</div>
		);

//		return( "hello");
	}
}