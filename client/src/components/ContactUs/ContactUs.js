import React, { Component } from 'react';
import MenuBar from '../Home/MenuBar.js'
import '../Signup/Signup.css';

export default class ContactUs extends Component {
 componentDidMount(){
    document.title = "Contact Us - ASIE Resume Database"
  }

  render() {
    return (
        <div>
           <MenuBar/>

        <div className="container">
        <div className="row">   
        <div className="col-6 form-box">
     
          <form className="signup-form" action="" method="">
            <div className="form-group">
              <h1>Contact Us</h1>
              
              <div>
                <label>Name</label>
                <input className="form-control" type="text" name="name"/>
              </div>
              <div>
                <label>Email</label>
                <input className="form-control" type="text" name="email"/>
              </div>
              <div>
                <label>Subject</label>
                <input className="form-control" type="text" name="subject"/>
              </div>
              <div>
                <label>Message</label>
                <textarea className="form-control" rows="5" name="message"/>
              </div>
              <div>
                <input className="btn btn-primary" type="submit" value="Submit"/>
              </div>
            </div>
            </form>
        </div> {/*col-8*/}
        </div> {/*row*/}
        </div> {/*container*/}
        </div> /*Empty div to wrap JSX*/
    );
  }
}