import toast from 'react-hot-toast'
import { GET_PRODUCT_BY_ID_SUCCESS, GET_PRODUCT_BY_ID_FALIURE } from '../action_types'

import { ApiGetNoAuth, ApiPostNoAuth } from '../apiData'

// Action Creators

export const getProductByIdSuccess = data => ({
  type: GET_PRODUCT_BY_ID_SUCCESS,

  payload: data
})

export const getProductByIdFaliure = error => ({
  type: GET_PRODUCT_BY_ID_FALIURE,

  payload: error
})

// Async Action to Fetch Data

export const getProductById = body => {
  return async dispatch => {
    try {
      const response = await ApiPostNoAuth(`/product/get-product-id`, body)
      console.log('response: ', response)

      //   toast.success(response?.message)
      dispatch(getProductByIdSuccess(response))
    } catch (error) {
      console.log('response, errror')

      dispatch(getProductByIdFaliure(error))
    }
  }
}
