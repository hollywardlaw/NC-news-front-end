import React, { Component } from 'react';
import { getComments, voteOnComment, deleteComment } from '../api.js';
import '../App.css';
import { navigate } from '@reach/router';

class Comments extends Component {
  state = {
    comments: [],
    voteChange: 0,
    voteLoading: false,
    votingError: false
  };
  render() {
    return (
      <div>
        <button onClick={this.getCommentData}>Show Comments</button>
        {this.state.comments.length !== 0 &&
          this.state.comments.map(comment => {
            return (
              <div key={comment.comment_id}>
                <p>Date posted: {comment.created_at.slice(0, 10)}</p>
                <p>"{comment.body}"</p>
                <p>by {comment.author}</p>
                <button
                  onClick={() => this.handleVoteClick(1, comment.comment_id)}
                  disabled={
                    this.state.voteChange === 1 || this.state.voteLoading
                  }
                >
                  Vote up!
                </button>
                <p>Votes {comment.votes + this.state.voteChange}</p>
                <button
                  onClick={() => this.handleVoteClick(-1, comment.comment_id)}
                  disabled={
                    this.state.voteChange === -1 || this.state.voteLoading
                  }
                >
                  Vote down!
                </button>
                {this.props.user && (
                  <button
                    onClick={() =>
                      this.deleteClicked(comment.comment_id, comment.author)
                    }
                  >
                    Delete comment
                  </button>
                )}
              </div>
            );
          })}
      </div>
    );
  }
  getCommentData = () => {
    getComments(this.props.article_id).then(res => {
      this.setState({ comments: res.data });
    });
  };
  handleVoteClick = (amount, comment_id) => {
    if (this.props.user !== null) {
      this.setState({
        voteLoading: true,
        votingError: false
      });
      voteOnComment(this.props.article_id, comment_id, amount)
        .then(() =>
          this.setState(prevState => ({
            voteChange: prevState.voteChange + amount,
            voteLoading: false
          }))
        )
        .catch(() => {
          this.setState({
            voteLoading: false,
            votingError: true
          });
        });
    }
  };
  deleteClicked = (comment_id, author) => {
    if (this.props.user === author) {
      deleteComment(this.props.article_id, comment_id).then(res => {
        navigate(`/articles/${this.props.article_id}`);
      });
    } else {
      alert('You can only delete your own comments!');
    }
  };
}
export default Comments;
