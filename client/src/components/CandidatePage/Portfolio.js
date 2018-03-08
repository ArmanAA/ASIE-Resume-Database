import React, { Component } from 'react';

class Portfolio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolio: props.data
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data) {
      this.setState({portfolio: nextProps.data})
    }
  }

  render() {
    if(this.state.portfolio){
      var projects = this.state.portfolio.map(function(projects){
        var projectImage = projects.thumbnail;
        return <div key={projects.title} className="columns portfolio-item">
           <div className="item-wrap">
            <a href={projects.url} title={projects.title}>
              <img alt={projects.title} src={projectImage} />
              <h5>{projects.title}</h5>
            </a>
            <p>{projects.description}</p>
          </div>
        </div>
      })
    }

    return (
      !this.props.data ?
        <span></span>
      :
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