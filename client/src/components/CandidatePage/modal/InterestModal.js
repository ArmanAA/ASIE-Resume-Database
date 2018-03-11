import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'
import "../../MenuBar.css";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

export default class InterestModal extends Component {
  constructor(props) {
    super(props);

    if(props.data) {
      var personal_tags = props.data.personal_interest || [];
      var career_tags = props.data.career_interest || [];
    }

    this.state = {
      open: false,
      personal: personal_tags,
      career: career_tags
    };
    //this.fname = props.data.firstName;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePersonal = this.handlePersonal.bind(this);
    this.handleCareer = this.handleCareer.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data) {
      this.setState({
        personal: nextProps.data.personal_interest,
        career: nextProps.data.career_interest
      });
    }
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  updateData(action, type, interest) {
    console.log("POST", action, type, interest);
    fetch('/api/candidate/update/interest', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({action: action, type: type, interest: interest}),
      credentials: 'include'
    });
  }

  handleChange(type, tags, changed, changedIndexes) {
    console.log(type);
    console.log(tags);
    console.log(changed);
    console.log(changedIndexes);
    this.setState({[type]: tags});

    for(var i=0; i<changed.length; i++) {
      if(tags[changedIndexes[i]] === changed[i]) {
        console.log("interest - add");
        this.updateData("add", type, changed[i]);
      }
      else {
        console.log("interest - remove");
        this.updateData("remove", type, changed[i]);
      }
    }
  }

  handlePersonal(tags, changed, changedIndexes) {
    this.handleChange("personal", tags, changed, changedIndexes);
  }

  handleCareer(tags, changed, changedIndexes) {
    this.handleChange("career", tags, changed, changedIndexes);
  }

  handleSubmit() {
    //window.location.reload();
  }

  render() {
    const { open } = this.state;
    return (
      !this.props.data ?
        <span></span>
      :
        <div style={styles}>
          <h2 className="Link" onClick={this.onOpenModal}>+ Interest</h2>
          <Modal open={open} onClose={this.onCloseModal} little>
            <h2>Interest</h2>
            <h3>Personal</h3>
            <form onSubmit={window.location.reload}>
              <TagsInput
                value={this.state.personal}
                onChange={this.handlePersonal}
                onlyUnique={true}
                inputProps={{className: 'react-tagsinput-input',  placeholder: 'Enter skills'}}
              />
              <br/>
              <h3>Career</h3>
              <TagsInput
                value={this.state.career}
                onChange={this.handleCareer}
                onlyUnique={true}
                inputProps={{className: 'react-tagsinput-input',  placeholder: 'Enter skills'}}
              />
              <br/>
              <input className='row' type="submit" value="Submit" />
            </form>
          </Modal>
        </div>
    );
  }
}