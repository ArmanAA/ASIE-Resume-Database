import React, {Component} from 'react';


export default class Comment extends Component {
 constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="comment border">
        <p className="author">{this.props.author}</p>
        {this.props.text}
      </div>
    );
  }
}
