import React, {Component} from 'react';
import Comment from './Comment'

export default class CommentList extends Component {
  constructor(props){
    super(props);
    this.state = {
      comments: props.data
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({
        comments: nextProps.data
      });
    }
  }

  render() {
    var values = this.state.comments || [];
    var comments = values.map(({ name, comment }) => (
      <Comment author={name} text={comment} />
    ));

    return <div className="comment-list">{comments}</div>;
  }
}