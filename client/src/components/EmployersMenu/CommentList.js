
import React, {Component} from 'react';
import Comment from './Comment'

export default class CommentList extends Component {
 constructor(props){
    super(props);
    console.log(props.data.length);
  }
   
  render() {
    
    var values = this.props.data;
    var comments = values.map(({author, text})=>
        <Comment author={author} text={text} />);

    return (
      <div className="comment-list">
        {comments}  
      </div>
    );
  }
}