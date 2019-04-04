import React, { Component } from 'react';
import axios from 'axios';

class Article extends Component {
  state = {
    article: {},
    comments: []
  };
  render() {
    return (
      <div>
        <h2>{this.state.article && this.state.article.title}</h2>
        <h4>by {this.state.article.author}</h4>
        <p>Topic: {this.state.article.topic}</p>
        <p>{this.state.article.body}</p>
        <p>Votes {this.state.article.votes} </p>
        <button onClick={this.getCommentData}>
          Comments
          {this.state.article.comment_count}
        </button>
        {this.state.comments.length !== 0 &&
          this.state.comments.map(comment => {
            return (
              <div key={comment.comment_id}>
                <p>Date posted: {comment.created_at.slice(0, 10)}</p>
                <p>"{comment.body}"</p>
                <p>by {comment.author}</p>
                <p>Votes {comment.votes}</p>
              </div>
            );
          })}
      </div>
    );
  }
  componentDidMount() {
    this.getSingleArticleData();
  }
  getSingleArticleData = () => {
    const url = `https://holly-nc-news.herokuapp.com/api/articles/${
      this.props.article_id
    }`;

    axios.get(url).then(res => {
      this.setState({ article: res.data.articles[0] });
    });
  };
  getCommentData = () => {
    const url = `https://holly-nc-news.herokuapp.com/api/articles/${
      this.props.article_id
    }/comments`;
    axios.get(url).then(res => {
      this.setState({ comments: res.data });
    });
  };
}
export default Article;
