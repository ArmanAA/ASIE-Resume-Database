import React, { Component } from "react";
import Modal from "react-responsive-modal";
import SearchPage from "../../SearchMenu/SearchPage";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

export default class SeachPotentialCandidatesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {}

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  handleSubmit(event) {
    // event.preventDefault();
    // const data = new FormData(event.target);
    // console.log(data);
    // fetch("/api/candidate/update/experience", {
    //   method: "POST",
    //   body: data,
    //   credentials: "include"
    // }).then(function(response) {
    //   if (response) {
    //     window.location.reload();
    //   } else {
    //     this.onCloseModal();
    //   }
    // });
  }
  render() {
    const { open } = this.state;
    return (
      <SearchPage>
        <button>Button</button>
      </SearchPage>
    );
  }
}
