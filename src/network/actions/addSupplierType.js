import toast from 'react-hot-toast'
import {
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FALIURE,
  ADD_MENUFACTURER_LIST_SUCCESS,
  ADD_MENUFACTURER_LIST_FALIURE,
  ADD_SUPPLIER_TYPE_LIST_SUCCESS,
  ADD_SUPPLIER_TYPE_LIST_FALIURE
} from '../action_types'

import { ApiGetNoAuth, ApiPostNoAuth } from '../apiData'

// Action Creators

export const addSupplierTypeSuccess = data => ({
  type: ADD_SUPPLIER_TYPE_LIST_SUCCESS,

  payload: data
})

export const addSupplierTypeFaliure = error => ({
  type: ADD_SUPPLIER_TYPE_LIST_FALIURE,

  payload: error
})

// Async Action to Fetch Data

export const addSupplierType = (url, body, extra) => {
  return async dispatch => {
    try {
      const response = await ApiPostNoAuth(`/master/${url}`, body)
      console.log('response: ', response)
      toast.success(response?.message)
      extra()
      dispatch(addSupplierTypeSuccess(response))
    } catch (error) {
      console.log('response, errror')

      dispatch(addSupplierTypeFaliure(error))
    }
  }
}
