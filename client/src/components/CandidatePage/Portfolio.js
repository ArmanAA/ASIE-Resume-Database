import React, { Component } from 'react';

class Portfolio extends Component {
  render() {
    const portfolio = [
      {
        "title":"Canadian Wanderlust",
        "category":"My Travel Blog for my post-university travels",
        "image":"canadian-wanderlust.jpg",
        "url":"https://www.canadianwanderlust.com"
      },
      {
        "title":"Fury Fighting Gear",
        "category":"(offline now) A fighting gear company I started",
        "image":"fury-fighting-gear.jpg",
        "url":"http://www.timbakerdev.com"
      },
      {
        "title":"Original Thai Food",
        "category":"Website I built for a restaurant I like in Thailand",
        "image":"original-thai-food.jpg",
        "url":"http://www.timbakerdev.com/originalthaifood.github.io"
      },
      {
        "title":"Resume Website",
        "category":"A React based resume website template",
        "image":"resume-website.jpg",
        "url":"http://www.timbakerdev.com"
      },
      {
        "title":"Smirkspace",
        "category":"(MVP Only) A React and Meteor based chat University project.",
        "image":"smirkspace.jpg",
        "url":"http://www.smirkspace.com"
      }
    ];

    if(portfolio){
      var projects = portfolio.map(function(projects){
        var projectImage = 'assets/images/'+projects.image;
        return <div key={projects.title} className="columns portfolio-item">
           <div className="item-wrap">
            <a href={projects.url} title={projects.title}>
               <img alt={projects.title} src={projectImage} />
               <div className="overlay">
                  <div className="portfolio-item-meta">
                 <h5>{projects.title}</h5>
                     <p>{projects.category}</p>
                  </div>
                </div>
              <div className="link-icon"><i className="fa fa-link"></i></div>
            </a>
          </div>
        </div>
      })
    }

    return (
      <section id="portfolio">

      <div className="row">

         <div className="twelve columns collapsed">

            <h1>Check Out Some of My Works.</h1>

            <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
                {projects}
            </div>
          </div>
      </div>
   </section>
    );
  }
}

export default Portfolio;