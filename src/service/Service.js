export default class Service {
  baseUrl = 'https://api.themoviedb.org/3/';
  apiKey = '09724bb1d3076915ab843000620ec06e';

  async getResource(url) {
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (e) {
      throw new Error(e);
    }
  }

  async getSearchMovies(searchValue, pageNumber = 1) {
    const url = `${this.baseUrl}search/movie?api_key=${this.apiKey}&query=${searchValue}&page=${pageNumber}`;
    const res = await this.getResource(url);
    return res;
  }
}

// export default class Service {
//   baseUrl = 'https://api.themoviedb.org/3/';
//   apiKey = '09724bb1d3076915ab843000620ec06e';

//   async getResource(url) {
//     try {
//       const res = await fetch(url);
//       return await res.json();
//     } catch (e) {
//       throw new Error(e);
//     }
//   }
//   async getSearchMovies(searchValue, pageNumber = 1) {
//     const url = `${this.baseUrl}search/movie?api_key=${this.apiKey}&language=en-US&query=${searchValue}&page=${pageNumber}&include_adult=false`;
//     const res = await this.getResource(url);
//     return res;
//   }
// }
