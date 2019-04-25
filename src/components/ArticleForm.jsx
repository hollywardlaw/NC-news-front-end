import React, { Component } from 'react';
import { postArticle, getTopics } from '../api';
import { navigate } from '@reach/router';
import '../App.css';

class ArticleForm extends Component {
  state = {
    title: '',
    body: '',
    topic: '',
    author: '',
    topics: [],
    triedToPost: false
  };
  render() {
    return (
      <form className="article-form" onSubmit={this.handleSubmit}>
        <h3>Post new article!</h3>
        <label>Title</label>
        <input
          required
          onChange={event => this.handleChange('title', event.target.value)}
        />
        <label>Body</label>
        <textarea
          required
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
        {this.state.triedToPost && <p>Please sign in to post an article!</p>}
      </form>
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
      postArticle({ title, body, author, topic })
        .then(res => {
          navigate(`/articles/${res.article_id}`);
        })
        .catch(err => {
          navigate('/error', { replace: true });
        });
    } else {
      this.setState({ triedToPost: true });
    }

    event.target.reset();
  };
}
export default ArticleForm;
