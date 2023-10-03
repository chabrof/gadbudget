import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Fetches {
  list: Array<Fetch>
}

export enum FetchStatus {
  PENDING = 0,
  DONE = 1,
  ERROR = 2
}

export interface Fetch {
  url: string,
  status: FetchStatus,
  error?: string
}

export interface SetStatusObj {
  idx: number,
  status: FetchStatus,
  error?: string
}

export const getInitialState = () => ({
  list: [],
})


export const flahOffersSlice = createSlice({
  name: 'fetches',
  initialState: getInitialState(),
  reducers: {
    pushFetch: (state, action: PayloadAction<Fetch>) => {
      // console.log('action', action)
      state.list.push(action.payload)
    },
    setStatusWithIdx: (state, action: PayloadAction<SetStatusObj>) => {
      const { payload: { idx, status, error = undefined } } = action

      // pre
      //console.assert(state.list[idx] !== undefined, `${idx} is not a valid index in fetches list`, {... state.list })

      if (state.list[idx] !== undefined) {
        state.list[idx].status = status
        state.list[idx].error = error
      }
    },
    resetFetches: (state) => {
      state.list = []
    }
  }
})

export const { pushFetch, setStatusWithIdx, resetFetches } = flahOffersSlice.actions

export default flahOffersSlice.reducer