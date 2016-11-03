import React, { Component } from 'react';
import { Link } from 'react-router'
import request from 'superagent';

class MovieContainer extends Component {
  constructor() {
    super();
    this.state = { message: '' }
  }

  componentDidMount() {
    var self = this;
    request
     .get('/api/movies/' + self.props.params.id)
     .set('Accept', 'application/json')
     .end(function(err, res) {
       if (err || !res.ok) {
         console.log('Oh no! error', err);
       } else {
         self.setState({message: res.body.message});
       }
     });
  }

  render() {
    return <Movie message={this.state.message} />;
  }
}

class Movie extends Component {
  render() {
    return (
      <div className="Movie">
        <div className="content" dangerouslySetInnerHTML={{__html: this.props.message}}></div>
      </div>
    );
  }
}

Movie.propTypes = {
  message: React.PropTypes.string
};

export default MovieContainer;
