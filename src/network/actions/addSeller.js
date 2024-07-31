import toast from 'react-hot-toast'
import { ADD_SELLER_SUCCESS, ADD_SELLER_FALIURE } from '../action_types'

import { ApiGetNoAuth, ApiPostNoAuth } from '../apiData'

// Action Creators

export const addSellerSuccess = data => ({
  type: ADD_SELLER_SUCCESS,

  payload: data
})

export const addSellerFaliure = error => ({
  type: ADD_SELLER_FALIURE,

  payload: error
})

// Async Action to Fetch Data

export const addSeller = (url, body, extra) => {
  return async dispatch => {
    try {
      const response = await ApiPostNoAuth(`/product/${url}`, body)
      console.log('response: ', response)
      extra()
      toast.success(response?.message)
      dispatch(addSellerSuccess(response))
    } catch (error) {
      console.log('response, errror')

      dispatch(addSellerFaliure(error))
    }
  }
}
