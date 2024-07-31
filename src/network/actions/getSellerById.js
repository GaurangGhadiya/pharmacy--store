import toast from 'react-hot-toast'
import {
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FALIURE,
  GET_SELLER_BY_ID_SUCCESS,
  GET_SELLER_BY_ID_FALIURE
} from '../action_types'

import { ApiGetNoAuth, ApiPostNoAuth } from '../apiData'

// Action Creators

export const getSellerByIdSuccess = data => ({
  type: GET_SELLER_BY_ID_SUCCESS,

  payload: data
})

export const getSellerByIdFaliure = error => ({
  type: GET_SELLER_BY_ID_FALIURE,

  payload: error
})

// Async Action to Fetch Data

export const getSellerById = body => {
  return async dispatch => {
    try {
      const response = await ApiPostNoAuth(`/product/get-seller-id`, body)
      console.log('response: ', response)

      //   toast.success(response?.message)
      dispatch(getSellerByIdSuccess(response))
    } catch (error) {
      console.log('response, errror')

      dispatch(getSellerByIdFaliure(error))
    }
  }
}
