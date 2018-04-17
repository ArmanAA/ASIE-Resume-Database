import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';

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

export default class AddFacilitator extends Component{
	constructor(props){
		super(props);
    	this.state = {
     	 open: false,
     	 fnInvalid: false,
     	 lnInvalid: false,
     	 emailInvalid: false
      
      };
       this.handleSubmit = this.handleSubmit.bind(this);
       this.toggle = this.toggle.bind(this);
	}

  toggle ()  {
    this.setState({ 
    	open: !this.state.open,
    	fnInvalid: false,
    	lnInvalid: false,
    	emailInvalid: false });
  };


  handleSubmit(event) {
  	
  	  	var confirm = window.confirm("Are you sure you want to add new facilitator?");
  	  	if(confirm){
  		    event.preventDefault();
          if(event.target.admin == null)
            event.target.admin = {checked: false};
  		    const data = {
  		    	firstname: event.target.firstname.value,
  		    	lastname: event.target.lastname.value,
  		    	email: event.target.email.value,
            admin: event.target.admin.checked
  		    };
  	
  		    fetch('/api/facilitators/create', {
  		      headers: { "Content-Type": "application/json" },
  		      method: 'POST',
  		      body: JSON.stringify(data),
  		      credentials: 'include'
  		    }).then(function(response) {
  		      if(response.ok) {
  		       window.alert("Facilitator invitation successful!", window.location);
  				window.location.href = "/facilitators";
  		      }
  		      else {
  		       window.alert("Invitation failed. Something went wrong.");
  		        this.onCloseModal();
  		      }
  	   		});
  		}
	
};
	    
	render(){
   

		return(
		<div style={styles} className="float-left">
		 <input className="btn btn-outline-primary mb-2  mx-1" onClick={this.toggle} type="button" value="Add Facilitator"/>
          <Modal isOpen={this.state.open} toggle={this.toggle} >
          <ModalHeader>
           Facilitator registration
           </ModalHeader>
           <ModalBody>
            <form className="form-group w-100 mx-auto" onSubmit={this.handleSubmit}>
              	<label className='row'> First Name <input className="form-control"  type="text" name="firstname" required/>
              	</label>
				<label className='row'> Last Name  <input className="form-control"  type="text" name="lastname" required />
				</label>
				<label className='row'> Email <input className="form-control"  type="email" name="email"/>
				</label>
        { this.props.type === 'SUPER' &&
          <label className='row form-control'><input type="checkbox" name="admin"/> Admin Account</label>
        }
				<button className="btn btn-primary col-4" color="primary" type="submit"> Add </button>{' '}
				<button className="btn btn-primary col-4" color="secondary" type="button" onClick={this.toggle}> Cancel</button>	

             
            </form>
            </ModalBody>
        </Modal>
        </div>
			);
	}
}