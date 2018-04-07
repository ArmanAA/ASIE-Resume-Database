import React, {Component} from 'react';
import Comment from './Comment.js';
import CommentForm from './CommentForm.js';
import CommentList from './CommentList.js';

/* Original deprecated version from CodePen https://codepen.io/anon/pen/mxmvPE */
var commentData = [
    { 
      author:"Shawn Spencerasdf", 
      text:"I've heard it both ways"
    },
    { 
      author:"Burton Guster", 
      text:"You hear about Pluto? That's messed up" 
    }
  ];

export default class CommentBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      comments: []
    }
    const self = this;

    let currUrl = new URL(window.location.href);
    let id = currUrl.searchParams.get("id");
    fetch("/api/comments/" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    }).then(comments => {
      comments.json().then(comments_json => {
        this.setState({comments: comments_json});
      })
    })

    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  AddCommentToDB(comment, next) {
    var currUrl = new URL(window.location.href);
    var url =
      "/api/comments/" +
      currUrl.searchParams.get("id") +
      "/add"
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({comment: comment})
    }).then(response => {
      response.json().then(next)
    });
    //document.title = "Employer Profile"; //Change to employer message subject?
  }

  handleCommentSubmit(comment) {
    this.AddCommentToDB(comment, response => {
      console.log(response);
      if(!response.message) {
        let current_comments = this.state.comments;
        current_comments.push(response);
        this.setState({ comments: current_comments });
      }
    });
  }

  render() {
    return (
      <div className="comment-box">
        <CommentList data={this.state.comments} />
        <CommentForm data={this.state.comments} onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
}