import React, {Component} from 'react';
import './AccountBar.css';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


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

const zindex = {
	zIndex : 1100
};
const zeroindex={
	zIndex : 2
};

export default class AccountBar extends Component{ 

	constructor(props){
		super(props);
		console.log("props", props);
		this.state = {
			name: "name",
			popoverOpen: false,
			modalOpen:false
		};

		this.toggleTooltip = this.toggleTooltip.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.logout = this.logout.bind(this);
		this.toggle = this.toggle.bind(this);
	}
	

	changePassword(e){
		e.preventDefault();
   	 	const data = new FormData(e.target);
    	console.log(e.target[0].value);
		this.setState({
			modalOpen: !this.state.modalOpen,
			popoverOpen: false
		})
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


		return (
		<div class="col-12 main-content">
			<div class="top-bar">
				<p> Hello, {this.state.name}! </p>
				<Button type="button" id="acct-popover" class="btn account-btn" onClick={this.toggleTooltip}>
				<Popover backdrop={false} placement="bottom" isOpen={this.state.popoverOpen} target="acct-popover" toggle={this.toggleTooltip}>
					<PopoverHeader> Account Settings </PopoverHeader>
					<PopoverBody>
						
						<div className="row" >
						<button className="btn btn-sm btn-block btn-primary" onClick={this.logout}> Log Out </button>
						</div>
						
						<div className="row">
						<button className="btn btn-sm btn-primary" onClick={this.toggle}>Change Password </button>
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
					</PopoverBody>
				 </Popover>
				<img src="./assets/images/settings.png" class="account-img img-circle"/>
				</Button>
				
			</div>
		</div> 
		);
	}
}