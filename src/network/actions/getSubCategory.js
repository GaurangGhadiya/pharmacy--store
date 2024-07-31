import { GET_SUB_CATEGORY_SUCCESS, GET_SUB_CATEGORY_FALIURE } from '../action_types'

import { ApiGetNoAuth, ApiPostNoAuth } from '../apiData'

// Action Creators

export const getSubCategorySuccess = data => ({
  type: GET_SUB_CATEGORY_SUCCESS,

  payload: data
})

export const getSubCategoryFaliure = error => ({
  type: GET_SUB_CATEGORY_FALIURE,

  payload: error
})

// Async Action to Fetch Data

export const getSubCategory = body => {
  return async dispatch => {
    try {
      const response = await ApiPostNoAuth(`/product/get-sub-category`, body)

      dispatch(getSubCategorySuccess(response))
    } catch (error) {
      dispatch(getSubCategoryFaliure(error))
    }
  }
}
