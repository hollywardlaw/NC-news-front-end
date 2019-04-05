import React, { Component } from 'react';
import { postArticle } from '../api';
import { navigate } from '@reach/router';

class ArticleForm extends Component {
  state = {
    title: '',
    body: '',
    topic: '',
    author: ''
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
        <input
          onChange={event => this.handleChange('topic', event.target.value)}
        />
        <button type="submit">Sumbit article</button>
      </form>
    );
  }
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
      postArticle(this.state).then(res => {
        navigate(`/articles/${res.article_id}`);
      });
    } else {
      alert('Please sign in to post an article!');
    }

    event.target.reset();
  };
}
export default ArticleForm;
