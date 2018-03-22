import React, {Component} from 'react';
import './profile.css';

export default class CommentForm extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit (e) {
    e.preventDefault();
    var authorVal = e.target[0].value.trim();
    var textVal = e.target[1].value.trim();
    if (!textVal || !authorVal) {
      return;
    }

    this.props.onCommentSubmit({author: authorVal, text: textVal});
    e.target[0].value = '';
    e.target[1].value = '';
    return;
  }

  render() {
    return(
      <form className="comment-form form-group full" onSubmit={this.handleSubmit}>
        <div className="input-group">
          <input type="text" placeholder="Your name" className="form-control" />
        </div>
        <div className="input-group">
          <input type="text" placeholder="Comments" className="form-control" />
        </div>
        <input type="submit" value="Post" className="btn btn-sm btn-primary" />
      </form>
    );
  }
}