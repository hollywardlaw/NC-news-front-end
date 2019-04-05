import React, { Component } from 'react';

class ArticleForm extends Component {
  state = {
    user: null
  };
  render() {
    return (
      <form>
        <h2>Post new article!</h2>
        <label>Title</label>
        <input />
        <label>Body</label>
        <textarea />
        <label>Topic</label>
        <input />
        <button type="submit">Sumbit article</button>
      </form>
    );
  }
}
export default ArticleForm;
