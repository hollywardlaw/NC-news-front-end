import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
  state = {
    articles: []
  };
  render() {
    console.log(this.state);
    return (
      <div>
        <h2>Articles!</h2>
      </div>
    );
  }
  componentDidMount() {
    this.getAllArticlesData();
  }
  getAllArticlesData = () => {
    const url = `https://holly-nc-news.herokuapp.com/api/articles`;
    axios.get(url).then(res => {
      this.setState({ articles: res.data.articles });
    });
  };
}
export default Home;
