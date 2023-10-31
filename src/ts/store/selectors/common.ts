import { createSelector } from '@reduxjs/toolkit'
import { Error } from '../errorsSlice'

export const getErrors = (state): Error[] =>
  state.errors.list

export const getLastError = (state): Error | undefined => {
  const errors = state.errors.list
  return errors.length ? errors[errors.length - 1] : undefined
}