import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      headerName: '',
      loading: false,
    };

    this.getUserfunc = this.getUserfunc.bind(this);
  }

  async componentDidMount() {
    this.getUserfunc();
  }

  getUserfunc() {
    this.setState({ loading: true });
    getUser().then(({ name }) => this.setState({
      headerName: name,
      loading: false,
    }));
  }

  render() {
    const { loading, headerName } = this.state;
    return (
      <header data-testid="header-component">
        <div>
          <ul>
            <li>
              <Link to="/search" data-testid="link-to-search">
                Pesquisa
              </Link>
            </li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">
                Favoritas
              </Link>
            </li>
            <li>
              <Link to="/profile" data-testid="link-to-profile">
                Perfil
              </Link>
            </li>
          </ul>
          {loading ? <Loading /> : (<h3 data-testid="header-user-name">{headerName}</h3>)}
        </div>
      </header>
    );
  }
}
