import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getTopics, postTopic } from '../api';

class Topics extends Component {
  state = {
    topics: [],
    slug: '',
    description: ''
  };
  render() {
    return (
      <nav>
        <Link to={`/articles`}>All topics </Link>
        {this.state.topics.map(topic => {
          return (
            <Link key={topic.slug} to={`/articles/topics/${topic.slug}`}>
              {topic.slug}
            </Link>
          );
        })}
        <form onSubmit={this.handleSubmit}>
          <h2>Post new topic!</h2>
          <label>Name</label>
          <input
            onChange={event => this.handleChange('slug', event.target.value)}
          />
          <label>Description</label>
          <textarea
            onChange={event =>
              this.handleChange('description', event.target.value)
            }
          />

          <button type="submit">Submit topic</button>
        </form>
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
  handleChange = (key, value) => {
    this.setState({
      [key]: value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { slug, description } = this.state;
    if (!this.state.topics.includes(slug)) {
      postTopic({ slug, description });
    }

    event.target.reset();
  };
}

export default Topics;
