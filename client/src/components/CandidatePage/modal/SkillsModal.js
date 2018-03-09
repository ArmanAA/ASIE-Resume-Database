import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const modal_styles = {
  backgroundColor:'rgba(255,255,255,0.5)'
}

export default class SkillsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      skills: props.data
    };
    //this.fname = props.data.firstName;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data) {
      this.setState({
        skills: nextProps.data
      })
    }
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  updateData(type, skill) {
    fetch('/api/candidate/update/skills', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({type: type, skill: skill}),
      credentials: 'include'
    });
  }

  handleAdd(item) {
    console.log(item);
    this.updateData("add", item);
  }

  handleRemove(item) {
    console.log(item);
    this.updateData("remove", item);
  }

  handleChange(tags, changed, changedIndexes) {
    console.log("tags", tags);
    console.log("changed", changed);
    console.log("changedIndexes", changedIndexes);
    this.setState({skills: tags});
    //added
    for(var i=0; i<changed.length; i++) {
      if(tags[changedIndexes[i]] === changed[i]) {
        this.handleAdd(changed[i]);
      }
      else {
        this.handleRemove(changed[i]);
      }
    }
  }

  handleSubmit() {
    window.location.reload();
  }

  render() {
    const { open } = this.state;
    return (
      !this.props.data ?
        <span></span>
      :
        <div style={styles}>
          <h2 onClick={this.onOpenModal}>+ Skills</h2>
          <Modal style={modal_styles} open={open} onClose={this.onCloseModal} little>
            <h2>Skills</h2>
            <form className="form-group" onSubmit={window.location.reload}>
              <TagsInput
                value={this.state.skills}
                onChange={this.handleChange.bind(this)}
                onlyUnique={true}
                inputProps={{className: 'react-tagsinput-input',  placeholder: 'Enter skills'}}
              />
              <br/>
              <input className='row form-control' type="submit" value="Submit" />
            </form>
          </Modal>
        </div>
    );
  }
}