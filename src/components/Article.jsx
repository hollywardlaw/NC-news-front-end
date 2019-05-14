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
    votingError: false,
    triedToDeleteArticle: false,
    triedToVote: false
  };
  render() {
    const { article, voteChange, voteLoading, triedToVote } = this.state;
    return (
      <div className="article">
        <h2>{article && article.title}</h2>
        <h4>by {article.author}</h4>
        <p>Topic: {article.topic}</p>
        <p className="article-body">{article.body}</p>
        <button
          onClick={() => this.handleVoteClick(1)}
          disabled={voteChange === 1 || voteLoading}
        >
          Vote up!
        </button>
        <span>Votes {article.votes + voteChange}</span>
        <button
          onClick={() => this.handleVoteClick(-1)}
          disabled={voteChange === -1 || voteLoading}
        >
          Vote down!
        </button>
        {voteLoading && <p>Voting...</p>}
        {triedToVote && <p className="error-tag">You must be logged in to vote!</p>}
        <p>
          Comments:
          {article.comment_count}
        </p>

        <Comments
          author={article.author}
          article_id={article.article_id}
          user={this.props.user}
          comment_count={article.comment_count}
        />

        <CommentForm
          user={this.props.user}
          article_id={article.article_id}
        />
        {this.props.user && (
          <button onClick={this.deleteClicked}>Delete article</button>
        )}
        {this.state.triedToDeleteArticle && (
          <p className="error-tag">You can only delete your own articles!</p>
        )}
      </div>
    );
  }
  componentDidMount() {
    this.getArticleData();
  }
  getArticleData = () => {
    getSingleArticle(this.props.article_id)
      .then(res => {
        
        if (res.data.article) {
          this.setState({ article: res.data.article });
        } else {
          navigate('/error', { replace: true });
        }
      })
      .catch(err => {
        navigate('/error', { replace: true });
      });
  };
  deleteClicked = () => {
    if (this.props.user === this.state.article.author) {
      deleteArticle(this.state.article.article_id)
        .then(res => {
          navigate(`/articles/`);
        })
        .catch(err => {
          navigate('/error', { replace: true });
        });
    } else {
      this.setState({ triedToDeleteArticle: true });
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
    } else {
      this.setState({ triedToVote: true });
    }
  };
}
export default Article;
