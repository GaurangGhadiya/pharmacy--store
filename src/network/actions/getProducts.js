import { GET_CATEGORY_SUCCESS, GET_CATEGORY_FALIURE, GET_PRODUCT_SUCCESS, GET_PRODUCT_FALIURE } from '../action_types'

import { ApiGetNoAuth, ApiPostNoAuth } from '../apiData'

// Action Creators

export const getProductsSuccess = data => ({
  type: GET_PRODUCT_SUCCESS,

  payload: data
})

export const getProductsFaliure = error => ({
  type: GET_PRODUCT_FALIURE,

  payload: error
})

// Async Action to Fetch Data

export const getProducts = body => {
  return async dispatch => {
    try {
      const response = await ApiPostNoAuth(`/product/get-product`, body)

      dispatch(getProductsSuccess(response))
    } catch (error) {
      dispatch(getProductsFaliure(error))
    }
  }
}
