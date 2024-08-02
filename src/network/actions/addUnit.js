import toast from 'react-hot-toast'
import {
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FALIURE,
  ADD_MENUFACTURER_LIST_SUCCESS,
  ADD_MENUFACTURER_LIST_FALIURE,
  ADD_BRAND_LIST_SUCCESS,
  ADD_BRAND_LIST_FALIURE,
  ADD_UNIT_LIST_SUCCESS,
  ADD_UNIT_LIST_FALIURE
} from '../action_types'

import { ApiGetNoAuth, ApiPostNoAuth } from '../apiData'

// Action Creators

export const addUnitSuccess = data => ({
  type: ADD_UNIT_LIST_SUCCESS,

  payload: data
})

export const addUnitFaliure = error => ({
  type: ADD_UNIT_LIST_FALIURE,

  payload: error
})

// Async Action to Fetch Data

export const addUnit = (url, body, extra) => {
  return async dispatch => {
    try {
      const response = await ApiPostNoAuth(`/master/${url}`, body)
      console.log('response: ', response)
      toast.success(response?.message)
      extra()
      dispatch(addUnitSuccess(response))
    } catch (error) {
      console.log('response, errror')

      dispatch(addUnitFaliure(error))
    }
  }
}
