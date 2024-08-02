import toast from 'react-hot-toast'
import {
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FALIURE,
  ADD_MENUFACTURER_LIST_SUCCESS,
  ADD_MENUFACTURER_LIST_FALIURE,
  DELETE_MENUFACTURER_LIST_SUCCESS,
  DELETE_MENUFACTURER_LIST_FALIURE,
  DELETE_PHARMA_GROUP_LIST_SUCCESS,
  DELETE_PHARMA_GROUP_LIST_FALIURE,
  DELETE_SUPPLIER_TYPE_SUCCESS,
  DELETE_SUPPLIER_TYPE_FALIURE
} from '../action_types'

import { ApiGetNoAuth, ApiPostNoAuth } from '../apiData'

// Action Creators

export const deleteSupplierTypeSuccess = data => ({
  type: DELETE_SUPPLIER_TYPE_SUCCESS,

  payload: data
})

export const deleteSupplierTypeFaliure = error => ({
  type: DELETE_SUPPLIER_TYPE_FALIURE,

  payload: error
})

// Async Action to Fetch Data

export const deleteSupplierType = (url, body, extra) => {
  return async dispatch => {
    try {
      const response = await ApiPostNoAuth(`/master/${url}`, body)
      console.log('response: ', response)
      toast.success(response?.message)
      extra()
      dispatch(deleteSupplierTypeSuccess(response))
    } catch (error) {
      console.log('response, errror')

      dispatch(deleteSupplierTypeFaliure(error))
    }
  }
}
