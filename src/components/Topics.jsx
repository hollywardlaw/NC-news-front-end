import React, { Component } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';

class Topics extends Component {
  state = {
    topics: []
  };
  render() {
    return (
      <nav>
        <Link to={`/articles`}>All topics </Link>
        {this.state.topics.map(topic => {
          return (
            <Link key={topic.slug} to={`/articles/topics/${topic.slug}`}>
              {topic.slug}{' '}
            </Link>
          );
        })}
      </nav>
    );
  }
  componentDidMount() {
    this.getAllTopicData();
  }
  getAllTopicData = () => {
    const url = `https://holly-nc-news.herokuapp.com/api/topics`;
    axios.get(url).then(res => {
      this.setState({ topics: res.data.topics });
    });
  };
}

export default Topics;
