import React, {Component} from 'react';
import { Alert,  } from 'reactstrap';
import MenuBar from "./Home/MenuBar.js";
import "./Signup/css/Signup.css";


export default class ForgotPassword extends Component {
 	
  constructor(props){
  	 super(props);
  	 this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){

  }

 componentDidMount() {
    document.title = "Forgot Password - ASIE Resume Database";
  }

  render() {

  	let url = new URL(window.location.href);
	let params = new URLSearchParams(url.search.slice(1));

    return (
      <div>
        <MenuBar />
        <div className="container">
 		{
			(params.get('email') != null) ?
				<Alert color="danger">
					No user is registered. Please try again with email registered.
				</Alert>
			:
				<span/>
		}{
			(params.get('error') != null) ?
				<Alert color="danger">
					Something went wrong! Pleas try again later.
				</Alert>
			:
				<span/>
		}{
			(params.get('success') != null) ?
				<Alert color="success">
					Success! New password will be sent to your email soon.
				</Alert>
			:
				<span/>
		}
		      
          <div className="row">
            <div className="col-6 form-box">
              <div className="row">
              <form className="col-12 signup-form=" action="/forgot" method="post">
                <div className="form-group">
                  <h1>Forgot Password?</h1>
                  <div>
                    <label>Enter email you used for registration</label>
                    <input className="form-control" type="text" name="email" />
                  </div>
              
                  <div>
                    <input
                      className="btn btn-primary"
                      type="submit"
                      value="Submit"
                    />
                  </div>
                </div>
              </form>
              </div>
            </div>{" "}
            {/*col-8*/}
          </div>{" "}
          {/*row*/}
        </div>{" "}
        {/*container*/}
      </div> /*Empty div to wrap JSX*/
    );
  }
}