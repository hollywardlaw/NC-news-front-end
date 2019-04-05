import React, { Component } from 'react';
import { postArticle, getTopics } from '../api';
import { navigate } from '@reach/router';

class ArticleForm extends Component {
  state = {
    title: '',
    body: '',
    topic: '',
    author: '',
    topics: []
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Post new article!</h2>
        <label>Title</label>
        <input
          onChange={event => this.handleChange('title', event.target.value)}
        />
        <label>Body</label>
        <textarea
          onChange={event => this.handleChange('body', event.target.value)}
        />
        <label>Topic</label>
        <select
          onChange={event => this.handleChange('topic', event.target.value)}
        >
          {this.state.topics.map(topic => {
            return (
              <option value={topic.slug} key={topic.slug}>
                {topic.slug}
              </option>
            );
          })}
        </select>
        <button type="submit">Sumbit article</button>
      </form>
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
  componentDidUpdate(_, prevState) {
    if (this.props.user !== prevState.author) {
      this.setState({ author: this.props.user });
    }
  }
  handleChange = (key, value) => {
    this.setState({
      [key]: value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (this.props.user) {
      const { title, body, author, topic } = this.state;
      postArticle({ title, body, author, topic }).then(res => {
        navigate(`/articles/${res.article_id}`);
      });
    } else {
      alert('Please sign in to post an article!');
    }

    event.target.reset();
  };
}
export default ArticleForm;
