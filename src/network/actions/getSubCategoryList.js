import { GET_SUB_CATEGORY_LIST_SUCCESS, GET_SUB_CATEGORY_LIST_FALIURE } from '../action_types'

import { ApiGetNoAuth } from '../apiData'

// Action Creators

export const getSubCategoryListSuccess = data => ({
  type: GET_SUB_CATEGORY_LIST_SUCCESS,

  payload: data
})

export const getSubCategoryListFaliure = error => ({
  type: GET_SUB_CATEGORY_LIST_FALIURE,

  payload: error
})

// Async Action to Fetch Data

export const getSubCategoryList = () => {
  return async dispatch => {
    try {
      const response = await ApiGetNoAuth(`/product/get-sub-category-list`, {})

      dispatch(getSubCategoryListSuccess(response))
    } catch (error) {
      dispatch(getSubCategoryListFaliure(error))
    }
  }
}
