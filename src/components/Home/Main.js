import React, {Component} from 'react';
import {Transition} from 'react-transition-group';
import './assets/main.css';

const duration = 200;

const defaultStyle = {
	transition: `filter ${duration}ms ease-in-out`,
}

const blurStyle={
	entering : {filter: 'blur(0px)'},
	entered: {filter: 'blur(15px)'},

};

export default class MainContent extends Component{
  state = { hoverLeft: false,
              hoverRight: false }

	handleHoverLeft(){
		this.setState(({hoverLeft, hoverRight}) => ({
			hoverLeft:true,
			hoverRight:false
		}))
	}

	handleHoverRight(){
		this.setState(({hoverLeft, hoverRight}) => ({
      hoverLeft:false,
      hoverRight:true
    }))
	}

  clearBlur(){
    this.setState(({hoverLeft, hoverRight}) => ({
      hoverLeft:false,
      hoverRight:false
    }))
  }

	render(){
	   const {hoverLeft, hoverRight} = this.state;
		return (


			<div className="container-fluid main">
					
      			<div className="row main-row">

      			<Transition in ={!!hoverLeft} timeout={duration}>
    				{(state)=>(
    					<div className="col-6 half-right"
                style={{...defaultStyle,...blurStyle[state]}}>
    						<div className="signup">
    				        	<a className="btn-a" href='/signup' onMouseOver={()=>this.handleHoverRight()}
                      onMouseLeave={()=>this.clearBlur()}>
    				        	Looking for a Job?<br/>
    				        	Click Here!</a>
    				        </div>
    					</div>
    					)}
				
				    </Transition>

            <Transition in ={!!hoverRight} timeout={duration}>
            {(state)=>(
              <div style={{...defaultStyle,...blurStyle[state]}} className="col-6 half-left">
                <div className="contactus">
                      <a className="btn-a" href='/contactus' onMouseOver={()=>this.handleHoverLeft()}
                      onMouseLeave={()=>this.clearBlur()}>
                      Looking For An Employee? <br/>
                      Contact Us Here!</a>
                    </div>
              </div>
              )}
        
            </Transition>
      		
	       			
{/*
		       		{this.state.hoverRight? (
		       			<div className="col=6 half-left" style={blurStyle}>
		       			<div className="contactus">
			        	<a href='' onMouseOver={this.handleHoverLeft}>
			        	Looking For An Employee? <br/>
			        	Contact Us Here!</a>
			        </div>
		        	</div>
		       		): (
		       			<div className="col=6 half-left" >
		       			<div className="contactus">
			        	<a href='' onMouseOver={this.handleHoverLeft}>
			        	Looking For An Employee? <br/>
			        	Contact Us Here!</a>
			        </div>
		        	</div>
		       		)}
		       		*/}
         		</div>
       		</div>
       )
       
	}
}