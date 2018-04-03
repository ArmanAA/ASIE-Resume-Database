import React, { Component } from "react";
import Comment from "./Comment";

export default class CommentList extends Component {
  constructor(props) {
    super(props);
    console.log(props.data.length);
  }

  componentDidMount() {
    //   var currUrl = new URL(window.location.href);
    // var url = "/api/search/employer/" + currUrl.searchParams.get("id");
    // this.callApi(url, "employer");
    // document.title = "Employer Profile"; //Change to employer message subject?
  }

  callApi = async (url, employer) => {
    const response = await fetch(url, { credentials: "include" });
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    //console.log(body);
    //  this.setState({ employer: body });
  };

  render() {
    var values = this.props.data;
    var comments = values.map(({ author, text }) => (
      <Comment author={author} text={text} />
    ));

    return <div className="comment-list">{comments}</div>;
  }
}
