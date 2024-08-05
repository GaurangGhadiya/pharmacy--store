import toast from 'react-hot-toast'
import {
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FALIURE,
  GET_MENUFACTURER_LIST_SUCCESS,
  GET_MENUFACTURER_LIST_FALIURE,
  GET_BRAND_LIST_SUCCESS,
  GET_BRAND_LIST_FALIURE,
  GET_SUPPLIER_TYPE_LIST_SUCCESS,
  GET_SUPPLIER_TYPE_LIST_FALIURE,
  GET_SUPPLIER_LIST_SUCCESS,
  GET_SUPPLIER_LIST_FALIURE
} from '../action_types'

import { ApiGetNoAuth, ApiPostNoAuth } from '../apiData'

// Action Creators

export const getSupplierSuccess = data => ({
  type: GET_SUPPLIER_LIST_SUCCESS,

  payload: data
})

export const getSupplierFaliure = error => ({
  type: GET_SUPPLIER_LIST_FALIURE,

  payload: error
})

// Async Action to Fetch Data
export const getSupplier = (page = 1) => {
  return async dispatch => {
    try {
      const response = await ApiGetNoAuth(`/master/get-supplier?page=${page}&pageSize=10`)
      console.log('response: ', response)

      //   toast.success(response?.message)
      dispatch(getSupplierSuccess(response))
    } catch (error) {
      console.log('response, errror')

      dispatch(getSupplierFaliure(error))
    }
  }
}
