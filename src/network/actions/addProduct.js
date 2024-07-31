import toast from 'react-hot-toast'
import { ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FALIURE, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FALIURE } from '../action_types'

import { ApiGetNoAuth, ApiPostNoAuth } from '../apiData'

// Action Creators

export const addProductSuccess = data => ({
  type: ADD_PRODUCT_SUCCESS,

  payload: data
})

export const addProductFaliure = error => ({
  type: ADD_PRODUCT_FALIURE,

  payload: error
})

// Async Action to Fetch Data

export const addProduct = (url, body, extra) => {
  return async dispatch => {
    try {
      const response = await ApiPostNoAuth(`/product/${url}`, body)
      console.log('response: ', response)
      extra()
      toast.success(response?.message)
      dispatch(addProductSuccess(response))
    } catch (error) {
      console.log('response, errror')

      dispatch(addProductFaliure(error))
    }
  }
}
