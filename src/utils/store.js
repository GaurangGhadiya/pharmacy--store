import { configureStore } from '@reduxjs/toolkit'

import { thunk } from 'redux-thunk' // Use Redux Thunk for async actions
import rootReducer from 'src/network/reducers'

// import { composeWithDevTools } from "@redux-devtools/extension";

const middleware = [thunk]

const initialState = {}

const store = configureStore({
  reducer: rootReducer,

  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware),

  devTools: process.env.NODE_ENV !== 'production',

  preloadedState: initialState
})

export default store
