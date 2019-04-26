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
                <br />
                <p>"{topic.description}..."</p>
              </div>
            );
          })}
        </ul>
        <form className="form" onSubmit={this.handleSubmit}>
          <h3>Post new topic!</h3>
          <br />
          <label>Name</label>
          <br />
          <input
            onChange={event => this.handleChange('slug', event.target.value)}
          />
          <br />
          <label>Description</label>
          <br />
          <textarea
            onChange={event =>
              this.handleChange('description', event.target.value)
            }
          />
          <br />
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
      postTopic({ slug, description }).then(() => {
        navigate(`/articles/topics/${this.state.slug}`);
      });
    }

    event.target.reset();
  };
}

export default Topics;
