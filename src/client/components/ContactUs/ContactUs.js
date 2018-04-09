import React, { Component } from "react";
import { Alert } from 'reactstrap';
import MenuBar from "../Home/MenuBar.js";
import "../Signup/css/Signup.css";

export default class ContactUs extends Component {
  componentDidMount() {
    document.title = "Contact Us - ASIE Resume Database";
  }

  render() {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search.slice(1));

    return (
      <div>
        <MenuBar />
        <div className="container">
          
          {
            (params.get('success') != null) ?
                <Alert color="success">
                  Success! Your message has been sent.
                </Alert>
            :
              <span/>
          }
          {
            (params.get('error') != null) ?
                <Alert color="danger">
                  Failed. Please try again later.
                </Alert>
            :
              <span/>
          }

          <div className="row">
            <div className="col-6 form-box">
              <div className="row">
              <form className="col-12 signup-form=" action="/contactus" method="post">
                <div className="form-group">
                  <h1>Contact Us</h1>

                  <div>
                    <label>First Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="firstName"
                    />
                  </div>
                  <div>
                    <label>Last Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="lastName"
                    />
                  </div>
                  <div>
                    <label>Email</label>
                    <input className="form-control" type="text" name="email" />
                  </div>
                  <div>
                    <label>Subject</label>
                    <input
                      className="form-control"
                      type="text"
                      name="subject"
                    />
                  </div>
                  <div>
                    <label>Message</label>
                    <textarea
                      className="form-control"
                      rows="5"
                      name="message"
                    />
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
