import React, { Component } from "react";
import Comment from "./Comment.js";
import CommentForm from "./CommentForm.js";
import CommentList from "./CommentList.js";

/* Original deprecated version from CodePen https://codepen.io/anon/pen/mxmvPE */
var commentData = [
  {
    author: "Shawn Spencer",
    text: "I've heard it both ways"
  },
  {
    author: "Burton Guster",
    text: "You hear about Pluto? That's messed up"
  }
];

export default class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: commentData
    };
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }
  callApi = async (url, employer) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "include"
    });
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    //console.log(body);
    //  this.setState({ employer: body });
  };
  componentDidMount() {}
  AddCommentToDB(comment) {
    var currUrl = new URL(window.location.href);
    var url =
      "/api/addcomments/" +
      currUrl.searchParams.get("id") +
      "&comment=" +
      comment;
    this.callApi(url, "facilitatornotes");
    //document.title = "Employer Profile"; //Change to employer message subject?
  }

  handleCommentSubmit(comment) {
    this.AddCommentToDB(comment);
    this.state.data.push(comment);
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({ data: this.state.data });
  }

  render() {
    return (
      <div className="comment-box">
        <CommentList data={this.state.data} />
        <CommentForm
          data={this.state.data}
          onCommentSubmit={this.handleCommentSubmit}
        />
      </div>
    );
  }
}
