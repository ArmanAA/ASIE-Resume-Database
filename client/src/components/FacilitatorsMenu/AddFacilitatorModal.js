import React, { Component } from 'react';
import Modal from 'react-responsive-modal';


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
      
      };
       this.handleSubmit = this.handleSubmit.bind(this);
       this.onOpenModal = this.onOpenModal.bind(this);
       this.onCloseModal = this.onCloseModal.bind(this);
	}

  onOpenModal ()  {
    this.setState({ open: true });
  };

  onCloseModal () {
    this.setState({ open: false });
  };

  handleSubmit(event) {
  	var confirm = window.confirm("Are you sure you want to add new facilitator?");
  	if(confirm){
	    event.preventDefault();
	    const data = {
	    	firstname: event.target.firstname.value,
	    	lastname: event.target.lastname.value,
	    	email: event.target.email.value	    
	    };

	    fetch('/api/create/facilitator', {
	      headers: { "Content-Type": "application/json" },
	      method: 'POST',
	      body: JSON.stringify(data),
	      credentials: 'include'
	    }).then(function(response) {
	    	console.log(response.ok);
	      if(response.ok) {
	       window.alert("Facilitator invitation successful!");
	       this.setState({open:false});
	      }
	      else {
	      	console.log(response);
	       window.alert("Invitation failed. Something went wrong.");
	        this.onCloseModal();
	      }
   		});
	}
	
};
	    
	render(){
    const { open } = this.state;
   

		return(
		<div style={styles}>
		 <button className="btn btn-secondary" onClick={this.onOpenModal}>Add facilitator</button>
          <Modal open={open} onClose={this.onCloseModal} style={styles.modal}>
          
           <h2>Facilitator registration</h2>

            <form className="form-grou modal-form" onSubmit={this.handleSubmit}>
              	<input name="firstname" className="form-control" type="text" placeholder="First Name"
				/> 
				<input name="lastname" className="form-control" type="text" placeholder="Last Name"
				/> 
				<input name="email" className="form-control" type="text" placeholder="Email"
				/> 
             
              <input className='row' type="submit" value="Add" />
            </form>
        </Modal>
        </div>
			);
	}
}