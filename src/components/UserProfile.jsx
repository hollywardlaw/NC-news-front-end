import React, { Component } from 'react';
import '../App.css';
import { getUser } from '../api.js';
import { navigate, Link } from '@reach/router';

class UserProfile extends Component {
  state = {
    user: null
  };
  render() {
    return (
      <>
        {this.state.user && (
          <div>
            <h1>{this.state.user.name}</h1>
            <h2>Username: {this.state.user.username}</h2>
            <Link
              className="topic-link"
              to={`/users/${this.state.user.username}`}
            >
              <h3>My articles</h3>
            </Link>
            <img src={this.state.user.avatar_url} alt="user avatar" />
          </div>
        )}
      </>
    );
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    getUser(this.props.user)
      .then(res => {
        this.setState({ user: res.data[0] });
      })
      .catch(err => {
        navigate('/error', { replace: true });
      });
  };
}
export default UserProfile;
