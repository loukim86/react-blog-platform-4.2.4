import { createSlice } from "@reduxjs/toolkit";

const articleSlice = createSlice({
    name: 'articles',
    initialState: {
      articles: [],
      article: {},
      articlesCount: 0,
    },
    reducers: {
      setArticles(state, action) {
        state.articles = action.payload.articles
      },
      setArticle(state, action) {
        state.article = action.payload.article
      },
      setArticlesCount(state, action) {
        state.articlesCount = action.payload.articlesCount
      },
    },
  })
  
  export const { setArticles, setArticle, setArticlesCount } = articleSlice.actions
  export default articleSlice.reducer