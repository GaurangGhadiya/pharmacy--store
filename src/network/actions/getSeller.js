import { GET_SELLER_SUCCESS, GET_SELLER_FALIURE } from '../action_types'

import { ApiGetNoAuth, ApiPostNoAuth } from '../apiData'

// Action Creators

export const getSellerSuccess = data => ({
  type: GET_SELLER_SUCCESS,

  payload: data
})

export const getSellerFaliure = error => ({
  type: GET_SELLER_FALIURE,

  payload: error
})

// Async Action to Fetch Data

export const getSeller = body => {
  return async dispatch => {
    try {
      const response = await ApiPostNoAuth(`/product/get-seller`, body)

      dispatch(getSellerSuccess(response))
    } catch (error) {
      dispatch(getSellerFaliure(error))
    }
  }
}
