import React, {Component} from 'react';
import './AccountBar.css';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Switch from 'react-toggle-switch';
import "../../../node_modules/react-toggle-switch/dist/css/switch.min.css";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  modal: {
    maxWidth: 800,
    position: 'relative',
    padding: '1.2rem',
    background: '#ffffff',
    backgroundClip: 'padding-box',
    boxShadow: '0 12px 15px 0 rgba(0,0,0,0.25)',
  }
};


export default class AccountBar extends Component{ 

	constructor(props){
		super(props);
	
		this.state = {
			popoverOpen: false,
			modalOpen:false,
			user:{},
			subscribed: null
		};
		//console.log(props.match.params);

		fetch('/api/users/userinfo',{
			headers:{"Content-Type": "application/json"},
			method:'post',
			credentials: 'include'
		}).then(response => {
			response.json().then(json => {
				
				fetch('/api/emaillist/exists', {
					method:'post',
					credentials: 'include'
				}).then(res => {
					res.json().then(json=>{
						this.setState({
							subscribed: json.subscribe
						})
					})

				});
				this.setState({
					user: json

				})
			});
			
		});

		this.toggleTooltip = this.toggleTooltip.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.logout = this.logout.bind(this);
		this.toggle = this.toggle.bind(this);
		this.subscribe = this.subscribe.bind(this);
	}
	

	changePassword(e){
		e.preventDefault();
   	 	const data = new FormData(e.target);
    	console.log(e.target[0].value);
    	// Validate 

    	// Update
    	fetch('/api/users/password', {
    		headers: { "Content-Type": "application/json" },
	     	method: 'POST',
	     	body: JSON.stringify({
	     		old: e.target[0].value,
	     		new: e.target[1].value
	     	}),
	     	credentials: 'include'
	    }).then(function(response) {
	    	console.log(response);
    	});
		this.setState({
			modalOpen: !this.state.modalOpen,
			popoverOpen: false
		})
	}

	subscribe(){
		
		if(!this.state.subscribed){
			//Not susbscribed
			fetch('/api/emaillist/add', {
				headers: {"Content-Type": "application/json"},
				method: 'post',
				credentials: 'include'
			}).then(res=>{
				if(res.status ===200){
					this.setState({subscribed: !this.state.subscribed})
				}
			})
		}else{
			fetch('/api/emaillist/remove',
			{
				headers: {"Content-Type": "application/json"},
				method: 'post',
				credentials: 'include'
			}).then(res=>{
				if(res.status ===200){
					this.setState({subscribed: !this.state.subscribed})
				}
				
			})
		}
		
	}

	logout(){
		window.location.href = '/logout';
	}

	toggle(){
		this.setState({
			modalOpen: !this.state.modalOpen,
		})
	}

	clossModal(){
		this.setState({
			modalOpen: false
		})
	}
	toggleTooltip(e){

		if(this.state.modalOpen){
			this.setState({
				popoverOpen: true
			});
		}else{
			this.setState({
				popoverOpen: !this.state.popoverOpen
			});
		}
		
	}

	render(){

		var adminDiv;
		if(this.state.user.usertype == 'FAC' || this.state.user.usertype == 'ADMIN'){
			adminDiv = (<div className="row mx-auto my-2" >
						<button disabled className="btn badge badge-pill badge-info nohover"> Subscription: </button>
							<Switch onClick={this.subscribe} on={this.state.subscribed} className="mx-auto" /> 
							
						</div>);
		}else{
			adminDiv = <div></div>
		}

		return (
		<div class="col-12 main-content">
			<div class="top-bar">
				<p> Hello, {this.state.user.firstName} {this.state.user.lastname} ! </p>
				<Button type="button" id="acct-popover" class="btn account-btn" onClick={this.toggleTooltip}>
				<Popover  placement="bottom" isOpen={this.state.popoverOpen} target="acct-popover" toggle={this.toggleTooltip}>
					<PopoverHeader> Account Settings </PopoverHeader>
					<PopoverBody>
						
						<div className="row" >
						<button className="btn btn-sm btn-block btn-primary" onClick={this.logout}> Log Out </button>
						</div>
						
						<div className="row">
						<button className="btn btn-sm btn-block btn-primary" onClick={this.toggle}>Change Password </button>
						<Modal zIndex={2000}  isOpen={this.state.modalOpen} toggle={this.toggle} >
				          <ModalHeader toggle={this.toggle}> Change Password </ModalHeader>
				          <ModalBody>
				           	<form className="form-group pw-form" onSubmit={this.changePassword}>
				              <label className='row'> Enter Original Password <input className="form-control"  type="password" name="orig_password"/></label>
				              <label className='row'> Enter New Password <input className="form-control"  type="password" name="new_password" /></label>
				              <label className='row'> Confirm New Password <input className="form-control"  type="password" name="confirm_password"/></label>
				          	  <button className="btn btn-primary" color="primary" type="submit"> Change Password </button>{' '}
				              <button className="btn btn-primary" color="secondary" type="cancel" onClick={this.closeModal}> Cancel</button>
				            </form> 
				         
				          </ModalBody>
				        </Modal>
				      </div>
				      {adminDiv}
					</PopoverBody>
				 </Popover>
				<img src="/assets/images/settings.png" class="account-img img-circle"/>
				</Button>
				
			</div>
		</div> 
		);
	}
}