import React from 'react';
import { debounce } from 'lodash';
import { Spin, Alert, Pagination } from 'antd';
import PropTypes from 'prop-types';

import MovieCard from '../MovieCard/MovieCard';
import MoviesApi from '../../service/Service';

import './MovieList.css';

export default class MovieList extends React.Component {
  static defaultProps = {
    searchValue: '',
    active: 'search',
  };
  static propTypes = {
    searchValue: PropTypes.string,
    active: PropTypes.string,
  };
  state = {
    moviesData: [],
    moviesRateData: [],
    query: '',
    currentPage: 1,
    loading: false,
    error: false,
    pageAll: 1,
    pageRate: 1,
    pageRateAll: 1,
    showAlert: false,
  };

  api = new MoviesApi();
  debounceFn = debounce((value) => this.getSearchMovies(value), 1500, { maxWait: Infinity });
  componentDidMount() {
    this.getRateFilms();
  }
  componentDidUpdate(prevProps, prevState) {
    const { searchValue } = this.props;
    if (searchValue !== prevState.query) {
      this.setState(() => {
        this.debounceFn(searchValue);
        return { query: searchValue };
      });
    }
  }

  getSearchMovies = (value) => {
    this.api
      .getSearchMovies(value, this.state.currentPage)
      .then((res) => {
        this.setState(() => {
          return {
            moviesData: res.results,
            pageAll: res.total_pages,
            loading: false,
            showAlert: res.results.length === 0,
          };
        });
      })
      .catch(() => this.setState({ error: true }));
  };

  getRateFilms = (page) => {
    this.api
      .getRatedMovies(page)
      .then((data) => {
        this.setState(() => {
          return { moviesRateData: data.results, pageRateAll: data.total_pages, pageRate: data.page };
        });
      })
      .catch(() => this.setState({ error: true }));
  };

  changePaginationSearch = (page) => {
    this.setState({
      currentPage: page,
      moviesData: [],
    });
    this.api
      .getSearchMovies(this.state.query, page)
      .then((res) => {
        console.log(res);
        this.setState({
          moviesData: res.results,
          pageAll: res.total_pages,
          loading: false,
          showAlert: res.results.length === 0,
        });
      })
      .catch(() => this.setState({ error: true }));
  };

  onChangePagination = (page) => {
    if (this.props.active === 'search') this.changePaginationSearch(page);
    if (this.props.active === 'rated') {
      this.getRateFilms(page);
    }
  };

  render() {
    const { moviesData, moviesRateData, loading, error, showAlert, currentPage, pageAll, pageRate, pageRateAll } =
      this.state;
    let dataFilms = this.props.active === 'search' ? moviesData : moviesRateData;
    let load = loading ? <Spin size="large" /> : null;
    let resultMessage = showAlert ? (
      <Alert
        className="movielist__error"
        message="Warning"
        description="We don't have movies with that name on our site :(
Try to write again"
        type="warning"
        showIcon
        closable
      />
    ) : null;

    let pagination;
    if (this.props.active === 'search') {
      pagination = (
        <Pagination
          className="pagination"
          current={currentPage}
          total={pageAll}
          defaultPageSize={1}
          showSizeChanger={false}
          hideOnSinglePage
          onChange={this.onChangePagination}
        />
      );
    } else if (!!moviesRateData.length && this.props.active === 'rated') {
      pagination = (
        <Pagination
          className="pagination"
          current={pageRate}
          total={pageRateAll}
          defaultPageSize={1}
          showSizeChanger={false}
          hideOnSinglePage
          onChange={this.onChangePagination}
        />
      );
    }

    return (
      <div>
        <div className="movielist">
          {resultMessage}
          {load}
          {!error ? (
            dataFilms.map((data) => {
              return (
                <MovieCard
                  key={data.id}
                  id={data.id}
                  loading={loading}
                  data={data}
                  genre={data.genre_ids}
                  logo={data.poster_path}
                  getRateFilms={this.getRateFilms}
                />
              );
            })
          ) : (
            <Alert type="error" message="Connection refused" showIcon className="movielist__error" />
          )}
        </div>
        <div className="pagination">{pagination}</div>
      </div>
    );
  }
}
