import React, { Component } from 'react';
import { getUsers } from '../api.js';
import '../App.css';

class LoginForm extends Component {
  state = {
    username: '',
    allUsers: []
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Enter your username:</label>
        <input required onChange={this.handleChange} />
      </form>
    );
  }

  componentDidMount() {
    this.getUserData();
  }
  getUserData = () => {
    getUsers().then(res => {
      this.setState({ allUsers: res.data.users });
    });
  };

  handleChange = e => {
    this.setState({ username: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username } = this.state;
    const { setUser } = this.props;
    let validUsernames = [...this.state.allUsers].reduce((acc, value) => {
      acc.push(value.username);
      return acc;
    }, []);
    if (validUsernames.includes(username)) {
      setUser(username);
    } else {
      alert('Please enter a valid username!');
    }
  };
}
export default LoginForm;
