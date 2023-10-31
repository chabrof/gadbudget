import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Error {
  title?: string
  message?: string,
  link?: string,
}

export interface ErrorsState {
  list: Error[]
}

const initialState: ErrorsState = {
  list: []
}

export const errorsSlice = createSlice({
  name: 'errorsSlice',
  initialState,
  reducers: {
    addError: (state, action: PayloadAction<Error>) => {
      state.list.push(action.payload)
    },
    resetErrors: (state) => {
      state.list = []
    },
  }
})

export const {
  addError,
  resetErrors,
} = errorsSlice.actions

export default errorsSlice.reducer
