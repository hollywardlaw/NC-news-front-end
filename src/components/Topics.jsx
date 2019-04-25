import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getTopics, postTopic } from '../api';
import '../App.css';
import { navigate } from '@reach/router';

class Topics extends Component {
  state = {
    topics: [],
    slug: '',
    description: ''
  };
  render() {
    return (
      <div>
        <ul className="topics">
          {this.state.topics.map(topic => {
            return (
              <div className="topic-list-item" key={topic.slug}>
                <Link
                  className="topic-link"
                  key={topic.slug}
                  to={`/articles/topics/${topic.slug}`}
                >
                  {topic.slug}
                </Link>
                <p>"{topic.description}..."</p>
              </div>
            );
          })}
        </ul>
        <form className="topic-form" onSubmit={this.handleSubmit}>
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
      </div>
    );
  }
  componentDidMount() {
    this.getAllTopicData();
  }
  getAllTopicData = () => {
    getTopics()
      .then(res => {
        this.setState({ topics: res.data.topics });
      })
      .catch(err => {
        navigate('/error', { replace: true });
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
