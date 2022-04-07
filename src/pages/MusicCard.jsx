import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.favoriteSong = this.favoriteSong.bind(this);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.getFavoritesSongs();
  }

  async getFavoritesSongs() {
    const { music } = this.props;
    const favoritesMusic = await getFavoriteSongs();
    let qualquer = '';
    favoritesMusic.forEach((song) => {
      qualquer += song.trackName;
    });
    const checkbox = document.getElementById(music.trackName);
    if (qualquer.includes(music.trackName)) {
      checkbox.checked = true;
    }
  }

  async favoriteSong({ target }) {
    if (target.checked) {
      const { music } = this.props;
      this.setState({
        loading: true,
      });
      await addSong(music);
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { music, index } = this.props;
    const { loading } = this.state;
    return (
      <div>
        { index === 0 ? <p>QUalquer coisa</p> : (
          <div>
            {music.previewUrl !== undefined && (
              <div>
                <span>{ music.trackName }</span>
                <audio
                  data-testid="audio-component"
                  src={ music.previewUrl }
                  controls
                >
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                  .
                </audio>
                <label htmlFor={ music.trackName }>
                  <input
                    type="checkbox"
                    data-testid={ `checkbox-music-${music.trackId}` }
                    id={ music.trackName }
                    onClick={ this.favoriteSong }
                  />
                  Favorita
                </label>
                {loading && <Loading />}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: Proptypes.shape({
    trackName: Proptypes.string,
    previewUrl: Proptypes.string,
    trackId: Proptypes.number,
  }),
  index: Proptypes.number.isRequired,
};

MusicCard.defaultProps = {
  music: Proptypes.shape({
    trackName: '',
    previewUrl: '',
    trackId: 0,
  }) };
