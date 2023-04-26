import React from 'react';
// import { Alert } from 'antd';

import Header from '../Header/Header';
import Search from '../Search/Search';
import MovieList from '../MovieList/MovieList';
import Service from '../../service/Service';

import './App.css';

export default class App extends React.Component {
  state = {
    active: 'search',
    searchValue: '',
    error: false,
  };
  api = new Service();

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
    console.log(this.state.searchValue);
  };

  render() {
    return (
      <div className="wrapper">
        <Header setActive={this.setActive} active={this.state.active} />
        <Search onLabelChange={this.onLabelChange} />
        <MovieList searchValue={this.state.searchValue} active={this.state.active} />
      </div>
    );
  }
}

// import React from 'react';
// import { debounce } from 'lodash';
// import { Alert } from 'antd';

// import Header from '../Header/Header';
// import Search from '../Search/Search';
// import MovieList from '../MovieList/MovieList';
// import Service from '../../service/Service';

// import './App.css';

// export default class App extends React.Component {
//   state = {
//     searchValue: '',
//     moviesData: [],
//     showAlert: false,
//     searchPage: 1,
//   };
//   api = new Service();
//   debounceFn = debounce(() => this.getSearchMovies(), 2000, { maxWait: Infinity });

//   onLabelChange = (e) => {
//     this.setState({ searchValue: e.target.value });
//     console.log(this.state.searchValue);
//   };
//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.searchValue !== this.state.searchValue) {
//       this.debounceFn();
//     }
//   }

//   getSearchMovies = () => {
//     this.api.getSearchMovies(this.state.searchValue, this.state.searchPage).then((res) => {
//       console.log(res);
//       this.setState(() => {
//         return {
//           moviesData: res.results,
//           showAlert: res.results.length === 0,
//         };
//       });
//     });
//   };

//   render() {
//     return (
//       <div className="wrapper">
//         <Header />
//         <Search onLabelChange={this.onLabelChange} />
//         <MovieList moviesData={this.state.moviesData} />
//         {this.state.showAlert ? (
//           <Alert
//             message="Warning"
//             description="We don't have movies with that name on our site :(
//     Try to write again"
//             type="warning"
//             showIcon
//             closable
//           />
//         ) : null}
//       </div>
//     );
//   }
// }
