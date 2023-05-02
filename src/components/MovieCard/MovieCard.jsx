import React from 'react';
import { Spin, Card, Tag, Rate, Alert } from 'antd';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import { GenresConsumer } from '../../context/GenresContext';
import MoviesApi from '../../service/Service';

import './MovieCard.css';

class MovieCard extends React.Component {
  static defaultProps = {
    logo: '',
    genre: [],
  };
  static propTypes = {
    logo: PropTypes.string,
    genre: PropTypes.array,
  };
  state = {
    loading: false,
    stars: 0,
    error: false,
  };
  api = new MoviesApi();
  setStars = async (rating) => {
    await this.api.postRatedMovie(this.props.id, rating);
    this.setState({ stars: rating });
    setTimeout(async () => {
      try {
        await this.props.getRateFilms();
      } catch (err) {
        this.setState({ error: true });
      }
    }, 1000);
  };

  render() {
    const { data, genre } = this.props;
    const { loading, error } = this.state;
    const imgPoster = 'https://orac-ural.ru/wp-content/uploads/2018/01/placeholder_1000x1280.jpg';
    const linkImage = data.poster_path ? `https://image.tmdb.org/t/p/w500/${data.poster_path}` : imgPoster;
    if (!loading) {
      let picture = new Image();
      picture.src = linkImage;
      picture.onload = () => {
        this.setState({ loading: true });
      };
    }

    const imageLoader = loading ? (
      <img src={data.poster_path ? linkImage : imgPoster} />
    ) : (
      <Spin className="spin" size="large" />
    );
    let color;
    if (data.vote_average > 7) {
      color = '#66E900';
    } else if (data.vote_average >= 5) {
      color = '#E9D100';
    } else if (data.vote_average > 3) {
      color = '#E97E00';
    } else {
      color = '#E90000';
    }

    return (
      <GenresConsumer>
        {(genres) => {
          return (
            <>
              {!error ? (
                <Card className="card">
                  <div className="card__image">{imageLoader}</div>
                  <div className="card__all">
                    <div className="card__info">
                      <div className="card__header">
                        <div className="header__title">
                          <h5>{data.title}</h5>
                        </div>
                        <div className="header__rate" style={{ border: `2px solid ${color}` }}>
                          <span>{data.vote_average.toFixed(1)}</span>
                        </div>
                      </div>
                      <p>{data.release_date ? format(new Date(data.release_date), 'MMMM d, yyyy') : 'none'} </p>
                      <div className="header__tags">
                        {genre.map((el) => {
                          const textGenre = genres.find((gen) => {
                            if (gen.id === el) return gen.name;
                          });
                          return <Tag key={el}>{textGenre.name}</Tag>;
                        })}
                      </div>
                    </div>
                    <p className="card__text">{data.overview}</p>
                    <Rate count={10} defaultValue={0} allowHalf onChange={this.setStars} />
                  </div>
                </Card>
              ) : (
                <Alert className="card__error" type="error" message="Connection refused" showIcon="true" />
              )}
            </>
          );
        }}
      </GenresConsumer>
    );
  }
}
export default MovieCard;
