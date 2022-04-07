import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { createUser } from '../services/userAPI';

import Loading from './Loading';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      loginName: '',
      loading: false,
      saveLogin: false,
    };

    this.handlechange = this.handlechange.bind(this);
    this.submitButton = this.submitButton.bind(this);
  }

  handlechange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async submitButton(e) {
    const { loginName } = this.state;
    e.preventDefault();
    this.setState({
      loading: true,
    });

    await createUser({ name: loginName });
    this.setState({
      loading: false,
      saveLogin: true,
    });
  }

  render() {
    const { loginName, loading, saveLogin } = this.state;
    if (saveLogin) return <Redirect to="/search" />;
    const quantityButtondisable = 3;

    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <form>
          <label htmlFor="loginName">
            Nome:
            <input
              data-testid="login-name-input"
              type="text"
              placeholder="Insira seu nome"
              onChange={ this.handlechange }
              value={ loginName }
              name="loginName"
              id="loginName"
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="submit"
            disabled={ loginName.length < quantityButtondisable }
            onClick={ this.submitButton }
          >
            Entrar
          </button>
          {(loading) && <Loading />}
        </form>
      </div>
    );
  }
}
