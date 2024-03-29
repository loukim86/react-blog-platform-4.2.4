class BlogService {
    baseUrl = 'https://blog.kata.academy/api/';
    pagesPerPage = 10;
  
    async getResponce(url, value = null, token = null, method = 'get') {
      const headers = {
        'Content-Type': 'application/json;charset=utf-8',
      };
  
      if (token) headers['Authorization'] = `Bearer ${token}`;
  
      const sendData = {
        method,
        headers,
      };
  
      if (value) sendData.body = JSON.stringify(value);
  
      try {
        const response = await fetch(`${this.baseUrl}/${url}`, sendData);
  
        if (!response.ok) {
          throw new Error(response.status);
        }
  
        return await response.json();
      } catch (error) {
        throw new Error(error);
      }
    }
  
    async getArticles(offset, token) {
      return await this.getResponce(`articles?limit=${this.pagesPerPage}&offset=${offset}`, null, token);
    }
  
    async getArticle(slug, token) {
      return await this.getResponce(`articles/${slug}`, null, token);
    }
  
    async registerUser(data) {
      return await this.getResponce('users', { user: data }, undefined, 'post');
    }
  
    async loginUser(data) {
      return await this.getResponce('users/login', { user: data }, undefined, 'post');
    }
  
    async getCurrentUser(token) {
      return await this.getResponce('user', null, token);
    }
  
    async updateUserData(data, token) {
      return await this.getResponce('user', { user: data }, token, 'put');
    }
  
    async createArticle(data, token) {
      return await this.getResponce('articles', { article: data }, token, 'post');
    }
  
    async updateArticle(data, slug, token) {
      return await this.getResponce(`articles/${slug}`, { article: data }, token, 'put');
    }
  
    async deleteArticle(slug, token) {
      return await this.getResponce(`articles/${slug}`, null, token, 'delete');
    }
  
    async addFavorite(slug, token) {
      return await this.getResponce(`articles/${slug}/favorite`, null, token, 'post');
    }
  
    async removeFavorite(slug, token) {
      return await this.getResponce(`articles/${slug}/favorite`, null, token, 'delete');
    }
  }
  
  export default new BlogService();
  