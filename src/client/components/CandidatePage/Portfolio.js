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
        return <div key={projects.title} className="columns portfolio-item">
           <div className="item-wrap">
            <a href={projects.url} title={projects.title}>
              <img alt={projects.title} src={projects.thumbnail} />
              <h5>{projects.title}</h5>
            </a>
            <p>{projects.description}</p>
          </div>
        </div>
      })
    }

    return (
      !this.state.portfolio || this.state.portfolio.length === 0 ?
        <span></span>
      :
        <section id="portfolio">
          <div className="row">
            <div className="col-10 columns collapsed section-title">
              <h1>Check Out Some of My Works</h1>
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