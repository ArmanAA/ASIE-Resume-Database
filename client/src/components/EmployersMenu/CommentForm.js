import React, {Component} from 'react';
import './profile.css';

export default class CommentForm extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit (e) {
    e.preventDefault();
    var comment = e.target[0].value.trim();
    if (!comment) {
      return;
    }

    this.props.onCommentSubmit(comment);
    e.target[0].value = '';
    return;
  }

  render() {
    return(
      <form className="comment-form form-group full" onSubmit={this.handleSubmit}>
        <div className="input-group">
          <input type="text" placeholder="Comments" className="form-control" />
        </div>
        <input type="submit" value="Post" className="btn btn-sm btn-primary" />
      </form>
    );
  }
}