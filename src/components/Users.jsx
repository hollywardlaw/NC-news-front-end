import React, { Component } from 'react';
import { getUsers } from '../api.js';
import '../App.css';
import { navigate, Link } from '@reach/router';

class Users extends Component {
  state = {
    users: []
  };
  render() {
    return (
      <div className="articles">
        {this.state.users.map(user => {
          return (
            <div className="article" key={user.username}>
              <Link className="topic-link" to={`/users/${user.username}`}>
                <h3>{user.name}</h3>
              </Link>
              Username: <h4>{user.username}</h4>
            </div>
          );
        })}
      </div>
    );
  }
  componentDidMount() {
    this.getUsersData();
  }

  getUsersData = () => {
    getUsers()
      .then(res => {
        this.setState({ users: res.data.users });
      })
      .catch(err => {
        navigate('/error', { replace: true });
      });
  };
}

export default Users;
