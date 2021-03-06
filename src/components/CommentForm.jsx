import React, { Component } from 'react';
import { postComment } from '../api';
import '../App.css';
import { navigate } from '@reach/router/lib/history';

class CommentForm extends Component {
  state = {
    body: '',
    author: '',
    triedToPost: false,
    posted: false
  };
  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h3>Post new comment</h3>
        <br />
        <textarea
          required
          onChange={event => this.handleChange('body', event.target.value)}
        />
        <br />

        <button type="submit">post comment</button>
        <br />
        {this.state.triedToPost && <p className="error-tag">Please sign in to post a comment!</p>}
        {this.state.posted && <p>Thank you! Your comment has been posted</p>}
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
      const commentToPost = {
        body: this.state.body,
        author: this.state.author
      };
      postComment(commentToPost, this.props.article_id)
        .then(() => {
          navigate(`/articles/${this.props.article_id}`);
        })
        .then(res => {
          this.setState({ posted: true, triedToPost: false });
        }).catch(err => {
          navigate('/error', { replace: true });
        });
    } else {
      this.setState({ triedToPost: true });
    }

    event.target.reset();
  };
}
export default CommentForm;
