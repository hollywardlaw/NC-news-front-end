import React, { Component } from 'react';
import { getSingleArticle, deleteArticle, voteOnArticle } from '../api.js';
import CommentForm from './CommentForm.jsx';
import { navigate } from '@reach/router';
import '../App.css';
import Comments from './Comments.jsx';

class Article extends Component {
  state = {
    article: {},
    voteChange: 0,
    voteLoading: false,
    votingError: false
  };
  render() {
    return (
      <div className="article">
        <h2>{this.state.article && this.state.article.title}</h2>
        <h4>by {this.state.article.author}</h4>
        <p>Topic: {this.state.article.topic}</p>
        <p>{this.state.article.body}</p>
        <button
          onClick={() => this.handleVoteClick(1)}
          disabled={this.state.voteChange === 1 || this.state.voteLoading}
        >
          Vote up!
        </button>
        <span>Votes {this.state.article.votes + this.state.voteChange}</span>
        <button
          onClick={() => this.handleVoteClick(-1)}
          disabled={this.state.voteChange === -1 || this.state.voteLoading}
        >
          Vote down!
        </button>
        {this.state.voteLoading && <p>Voting...</p>}
        <p>
          Comments:
          {this.state.article.comment_count}
        </p>
        <Comments
          author={this.state.article.author}
          article_id={this.state.article.article_id}
          user={this.props.user}
        />
        <CommentForm
          user={this.props.user}
          article_id={this.state.article.article_id}
        />
        {this.props.user && (
          <button onClick={this.deleteClicked}>Delete article</button>
        )}
      </div>
    );
  }
  componentDidMount() {
    this.getArticleData();
  }
  getArticleData = () => {
    getSingleArticle(this.props.article_id).then(res => {
      this.setState({ article: res.data.articles[0] });
    });
  };
  deleteClicked = () => {
    if (this.props.user === this.state.article.author) {
      deleteArticle(this.state.article.article_id).then(res => {
        navigate(`/articles/`);
      });
    } else {
      alert('You can only delete your own articles!');
    }
  };
  handleVoteClick = amount => {
    if (this.props.user !== null) {
      this.setState({
        voteLoading: true,
        votingError: false
      });
      voteOnArticle(this.state.article.article_id, amount)
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
}
export default Article;
