import { GET_CODE_SUCCESS, GET_CODE_FALIURE } from '../action_types'

import { ApiGetNoAuth } from '../apiData'

// Action Creators

export const getCodeSuccess = data => ({
  type: GET_CODE_SUCCESS,

  payload: data
})

export const getCodeFaliure = error => ({
  type: GET_CODE_FALIURE,

  payload: error
})

// Async Action to Fetch Data

export const getCode = () => {
  return async dispatch => {
    try {
      const response = await ApiGetNoAuth(`/product/get-code`, {})

      dispatch(getCodeSuccess(response))
    } catch (error) {
      dispatch(getCodeFaliure(error))
    }
  }
}
