import toast from 'react-hot-toast'
import {
  ADD_SUB_CATEGORY_SUCCESS,
  ADD_SUB_CATEGORY_FALIURE,
  ADD_SUPPLIER_SUCCESS,
  ADD_SUPPLIER_FALIURE
} from '../action_types'

import { ApiGetNoAuth, ApiPostNoAuth } from '../apiData'

// Action Creators

export const addSupplierSuccess = data => ({
  type: ADD_SUPPLIER_SUCCESS,

  payload: data
})

export const addSupplierFaliure = error => ({
  type: ADD_SUPPLIER_FALIURE,

  payload: error
})

// Async Action to Fetch Data

export const addSupplier = (url, body, extra) => {
  return async dispatch => {
    try {
      const response = await ApiPostNoAuth(`/master/${url}`, body)
      console.log('response: ', response)
      toast.success(response?.message)
      extra()
      dispatch(addSupplierSuccess(response))
    } catch (error) {
      console.log('response, errror', error)

      dispatch(addSupplierFaliure(error))
    }
  }
}
