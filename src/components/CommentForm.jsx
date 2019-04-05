import React, { Component } from 'react';
import { postComment } from '../api';

class CommentForm extends Component {
  state = {
    body: '',
    author: ''
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Post new comment</h3>
        <textarea
          onChange={event => this.handleChange('body', event.target.value)}
        />
        <button type="submit">post comment</button>
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
      postComment(this.state, this.props.article_id).then(res => {
        alert('Thank you! Your comment has been posted');
      });
    } else {
      alert('Please sign in to post a comment!');
    }

    event.target.reset();
  };
}
export default CommentForm;
