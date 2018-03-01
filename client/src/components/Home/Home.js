import React, { Component } from 'react';
import CustomMenuBar from './MenuBar.js';
import MainContent from './Main.js';


export default class Home extends Component {

	componentDidMount(){
		document.title = "Welcome to ASIE Resume Database!"
	}



  render() {
   

    return (
      <div>
      	  <CustomMenuBar/>
          <MainContent/>
     </div>
    );
  }
}


