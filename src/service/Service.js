export default class Service {
  baseUrl = 'https://api.themoviedb.org/3/';
  apiKey = '09724bb1d3076915ab843000620ec06e';
  tokenId = null;

  async getResource(url) {
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (e) {
      throw new Error(e);
    }
  }
  async getSearchMovies(searchValue, pageNumber = 1) {
    return await this.getResource(
      `${this.baseUrl}search/movie?api_key=${this.apiKey}&query=${searchValue}&page=${pageNumber}`
    );
  }
  async getSession() {
    return await this.getResource(`${this.baseUrl}authentication/guest_session/new?api_key=${this.apiKey}`)
      .then((data) => {
        if (localStorage.getItem('guest_session_id')) {
          this.tokenId = localStorage.getItem('guest_session_id');
          return localStorage.getItem('guest_session_id');
        }
        this.tokenId = data.guest_session_id;
        localStorage.setItem('guest_session_id', this.tokenId);
      })
      .catch((error) => error);
  }
  async postRatedMovie(movieId, rating) {
    this.tokenId = localStorage.getItem('guest_session_id');
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        value: rating,
      }),
    };
    fetch(
      `${this.baseUrl}movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${this.tokenId}`,
      requestOptions
    );
  }
  async getRatedMovies(page = 1) {
    this.tokenId = localStorage.getItem('guest_session_id');
    const data = await this.getResource(
      `${this.baseUrl}guest_session/${this.tokenId}/rated/movies?api_key=${this.apiKey}&page=${page}`
    );
    if (data.status === 401) {
      localStorage.removeItem('guest_session_id');
      this.getSession();
    }
    return data;
  }
  async getGenres() {
    const data = await this.getResource(`${this.baseUrl}genre/movie/list?api_key=${this.apiKey}`);
    return data;
  }
}
