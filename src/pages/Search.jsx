import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';

import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      pesquisa: '',
      artistName: '',
      loading: false,
      artists: [],
      validAlbum: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async onSubmit(e) {
    const { pesquisa } = this.state;
    e.preventDefault();
    this.setState({
      loading: true,
      artistName: pesquisa,
    });
    const result = await searchAlbumsAPI(pesquisa);
    this.setState({
      validAlbum: result.length !== 0,
      pesquisa: '',
      artists: result,
      loading: false,
    });
  }

  render() {
    const { pesquisa, loading, artistName, artists, validAlbum } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : (
          <form>
            <input
              type="text"
              placeholder="Digite o nome da banda ou artista"
              data-testid="search-artist-input"
              name="pesquisa"
              onChange={ this.handleChange }
              value={ pesquisa }
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ pesquisa.length < 2 }
              onClick={ this.onSubmit }
            >
              Pesquisar
            </button>
          </form>
        )}

        {artistName.length !== 0 && (
          validAlbum === true ? (
            <section>
              <h2>
                Resultado de álbuns de:
                { ` ${artistName}` }
              </h2>
              {artists.map((artist) => (
                <Link
                  key={ artist.collectionId }
                  to={ `/album/${artist.collectionId}` }
                  data-testid={ `link-to-album-${artist.collectionId}` }
                >
                  <div>
                    <img src={ artist.artworkUrl100 } alt={ artist.artistName } />
                    <h3>{ artist.collectionName }</h3>
                    <p>{ artist.artistName }</p>
                  </div>
                </Link>
              ))}
            </section>
          ) : <h2>Nenhum álbum foi encontrado</h2>)}
      </div>
    );
  }
}
