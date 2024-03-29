import { configureStore } from '@reduxjs/toolkit'


import articleSlice from './slices/articleSlice'
import uiSlice from './slices/uiSlice'
import userSlice from './slices/userSlice'

const store = configureStore({
  reducer: { article: articleSlice, ui: uiSlice, user: userSlice }

})

export default store