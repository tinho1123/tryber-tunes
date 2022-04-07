import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from './MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      loading: true,
      favoMusic: [],
    };
    this.searchMusic = this.searchMusic.bind(this);
  }

  componentDidMount() {
    this.searchMusic();
  }

  async searchMusic() {
    const { match: { params: { id } } } = this.props;
    const arrMusic = await getMusics(id);
    this.setState({
      musics: arrMusic,
      loading: false,
    });
  }

  render() {
    const { musics, loading, favoMusic } = this.state;
    console.log(favoMusic);
    return (loading ? <Loading /> : (
      <div data-testid="page-album">
        <Header />
        <h3 data-testid="album-name">{`Collection Name ${musics[0].collectionName} `}</h3>
        <p data-testid="artist-name">{`Artist Name ${musics[0].artistName}`}</p>
        {musics.map((music, index) => (
          <MusicCard
            music={ music }
            key={ index }
            index={ index }
          />)) }
      </div>
    ));
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
