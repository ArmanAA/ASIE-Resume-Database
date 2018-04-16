import React, {Component} from 'react';


export default class Comment extends Component {
 constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="comment border">
        <p className="author"><u>{this.props.author}</u></p>
        {this.props.text}
      </div>
    );
  }
}
