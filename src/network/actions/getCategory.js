import { GET_CATEGORY_SUCCESS, GET_CATEGORY_FALIURE } from '../action_types'

import { ApiGetNoAuth, ApiPostNoAuth } from '../apiData'

// Action Creators

export const getCategorySuccess = data => ({
  type: GET_CATEGORY_SUCCESS,

  payload: data
})

export const getCategoryFaliure = error => ({
  type: GET_CATEGORY_FALIURE,

  payload: error
})

// Async Action to Fetch Data

export const getCategory = body => {
  return async dispatch => {
    try {
      const response = await ApiPostNoAuth(`/product/get-category`, body)

      dispatch(getCategorySuccess(response))
    } catch (error) {
      dispatch(getCategoryFaliure(error))
    }
  }
}
