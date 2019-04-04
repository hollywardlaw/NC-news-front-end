import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getTopics } from '../api';

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
    getTopics().then(res => {
      this.setState({ topics: res.data.topics });
    });
  };
}

export default Topics;
