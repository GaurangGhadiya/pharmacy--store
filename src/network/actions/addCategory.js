import toast from 'react-hot-toast'
import { ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FALIURE } from '../action_types'

import { ApiGetNoAuth, ApiPostNoAuth } from '../apiData'

// Action Creators

export const addCategorySuccess = data => ({
  type: ADD_CATEGORY_SUCCESS,

  payload: data
})

export const addCategoryFaliure = error => ({
  type: ADD_CATEGORY_FALIURE,

  payload: error
})

// Async Action to Fetch Data

export const addCategory = (url, body, extra) => {
  return async dispatch => {
    try {
      const response = await ApiPostNoAuth(`/product/${url}`, body)
      console.log('response: ', response)
      toast.success(response?.message)
      extra()
      dispatch(addCategorySuccess(response))
    } catch (error) {
      console.log('response, errror')

      dispatch(addCategoryFaliure(error))
    }
  }
}
