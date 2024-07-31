import { GET_CATEGORY_LIST_SUCCESS, GET_CATEGORY_LIST_FALIURE } from '../action_types'

import { ApiGetNoAuth } from '../apiData'

// Action Creators

export const getCategoryListSuccess = data => ({
  type: GET_CATEGORY_LIST_SUCCESS,

  payload: data
})

export const getCategoryListFaliure = error => ({
  type: GET_CATEGORY_LIST_FALIURE,

  payload: error
})

// Async Action to Fetch Data

export const getCategoryList = () => {
  return async dispatch => {
    try {
      const response = await ApiGetNoAuth(`/product/get-category-list`, {})

      dispatch(getCategoryListSuccess(response))
    } catch (error) {
      dispatch(getCategoryListFaliure(error))
    }
  }
}
