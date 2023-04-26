import React from 'react';
import { debounce } from 'lodash';
import { Alert, Pagination } from 'antd';

import MovieCard from '../MovieCard/MovieCard';
import Service from '../../service/Service';

import './MovieList.css';

export default class MovieList extends React.Component {
  state = {
    moviesData: [],
    query: '',
    showAlert: false,
    currentPage: 1,
    pageAll: 2,
  };

  api = new Service();
  debounceFn = debounce(() => this.getSearchMovies(), 2000, { maxWait: Infinity });

  componentDidUpdate(prevProps, prevState) {
    const { searchValue } = this.props;
    if (searchValue !== prevState.query) {
      this.setState({ query: searchValue }, () => {
        this.debounceFn();
      });
    }
  }
  getSearchMovies = () => {
    this.api.getSearchMovies(this.state.query, this.state.currentPage).then((res) => {
      console.log(res);
      this.setState(() => {
        return {
          moviesData: res.results,
          showAlert: res.results.length === 0,
          pageAll: res.total_pages,
        };
      });
    });
  };

  onChangePagination = (page) => {
    console.log(this.state.query, page);
    this.api.getSearchMovies(this.state.query, page).then((res) => {
      console.log(res);
      this.setState({
        moviesData: res.results,
        showAlert: res.results.length === 0,
        pageAll: res.total_pages,
      });
    });
  };

  render() {
    const { moviesData, currentPage, pageAll } = this.state;
    console.log(pageAll);
    console.log('1');
    let dataFilms = moviesData;

    let resultMessage = this.state.showAlert ? (
      <Alert
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
          current={currentPage}
          total={pageAll}
          defaultPageSize={1}
          showSizeChanger={false}
          hideOnSinglePage
          onChange={this.onChangePagination}
        />
      );
    }
    return (
      <div className="movielist">
        {resultMessage}
        {dataFilms.map((data) => {
          return <MovieCard key={data.id} data={data} logo={data.poster_path} />;
        })}
        <div className="pagination">{pagination}</div>
      </div>
    );
  }
}

// import React from 'react';
// import { Pagination } from 'antd';

// import MovieCard from '../MovieCard/MovieCard';

// import './MovieList.css';

// export default class MovieList extends React.Component {
//   render() {
//     const { moviesData } = this.props;
//     return (
//       <div className="movielist">
//         {moviesData.map((data) => {
//           return <MovieCard key={data.id} data={data} logo={data.poster_path} />;
//         })}
//         <Pagination className="pagination" defaultCurrent={1} total={50} hideOnSinglePage={false} />
//       </div>
//     );
//   }
// }
