import { configureStore } from '@reduxjs/toolkit'
import fetchesReducer from './fetchesSlice'
import errorsReducer from './errorsSlice'

const storeConfig = {
  reducer: {
    fetches: fetchesReducer,
    errors: errorsReducer
  }
}

export const createEmptyStore = () => configureStore({ ...storeConfig, preloadedState: globalThis.__storeSSG })

// If the page was generated on server we get back a correct Redux State according to what is available in the HTML
export const store = createEmptyStore()

/* export const createStoreWithPreInitedState = (preloadedState) => {
  return configureStore({ ...storeConfig, preloadedState })
} */

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch