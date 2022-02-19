export default class ImageApiService {
  BASE_URL = 'https://pixabay.com/api/';

  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }
    
  fetchImages() {
    console.log(this);
    const queryParams = new URLSearchParams({
      key: '25731511-e5f7726e83d52bf5fe5f97cfd',
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: this.perPage,
    });

    return fetch(`${this.BASE_URL}?${queryParams}`)
      .then(response => response.json());
  }

  getApiUrl() {
    const queryParams = new URLSearchParams({
      key: '25731511-e5f7726e83d52bf5fe5f97cfd',
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: this.perPage,
    });
    return `${this.BASE_URL}?${queryParams}`;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  getPage() {
    return this.page;
  }

  resetPage() {
    this.page = 1;
  }

}