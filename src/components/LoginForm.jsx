import React, { Component } from 'react';

class LoginForm extends Component {
  state = { username: '' };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} />
      </form>
    );
  }
  handleChange = e => {
    this.setState({ username: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username } = this.state;
    const { setUser } = this.props;
    setUser(username);
  };
}
export default LoginForm;
