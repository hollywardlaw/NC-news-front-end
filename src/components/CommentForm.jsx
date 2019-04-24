import React, { Component } from 'react';
import { postComment } from '../api';
import '../App.css';

class CommentForm extends Component {
  state = {
    body: '',
    author: '',
    triedToPost: false,
    posted: false
  };
  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <h3>Post new comment</h3>
        <textarea
          required
          onChange={event => this.handleChange('body', event.target.value)}
        />

        <button type="submit">post comment</button>
        {this.state.triedToPost && <p>Please sign in to post a comment!</p>}
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
      postComment(commentToPost, this.props.article_id).then(res => {
        this.setState({ posted: true, triedToPost: false });
      });
    } else {
      this.setState({ triedToPost: true });
    }

    event.target.reset();
  };
}
export default CommentForm;
