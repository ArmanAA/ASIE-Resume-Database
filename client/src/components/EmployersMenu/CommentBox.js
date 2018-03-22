import React, {Component} from 'react';
import Comment from './Comment.js';
import CommentForm from './CommentForm.js';
import CommentList from './CommentList.js';

/* Original deprecated version from CodePen https://codepen.io/anon/pen/mxmvPE */
var commentData = [
    { 
      author:"Shawn Spencer", 
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
      data: commentData
    }
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
 
  }

  componentDidMount(){
  }

  handleCommentSubmit(comment) {
    this.state.data.push(comment);
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: this.state.data});
  }

  render() {
    return (
      <div className="comment-box">
        <CommentList data={this.state.data} />
        <CommentForm data={this.state.data} onCommentSubmit={this.handleCommentSubmit} />
        
      </div>
    );
  }
}
