import React from 'react';
import { Alert } from 'antd';

import Header from '../Header/Header';
import Search from '../Search/Search';
import MovieList from '../MovieList/MovieList';
import MoviesApi from '../../service/Service';
import { GenresProvider } from '../GenresContext/GenresContext';

import './App.css';

export default class App extends React.Component {
  state = {
    active: 'search',
    searchValue: '',
    genres: [],
    error: false,
  };
  api = new MoviesApi();

  async componentDidMount() {
    try {
      await this.api.getSession();
      const data = await this.api.getGenres();
      this.setState({ genres: data.genres });
    } catch (e) {
      this.setState({ error: true });
    }
  }

  componentDidCatch() {
    this.setState({ error: true });
  }

  setActive = (e) => {
    this.setState(() => {
      return { active: e };
    });
  };

  onLabelChange = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  render() {
    return (
      <main className="wrapper">
        {!this.state.error ? (
          <GenresProvider value={this.state.genres}>
            <Header setActive={this.setActive} active={this.state.active} />
            {this.state.active === 'search' ? <Search onLabelChange={this.onLabelChange} /> : null}
            <MovieList searchValue={this.state.searchValue} active={this.state.active} />
          </GenresProvider>
        ) : (
          <Alert type="error" message="Connection refused,please use VPN" showIcon="true" />
        )}
      </main>
    );
  }
}
