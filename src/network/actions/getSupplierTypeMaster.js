import {
  GET_SUB_CATEGORY_LIST_SUCCESS,
  GET_SUB_CATEGORY_LIST_FALIURE,
  GET_SUPPLIER_TYPE_MASTER_LIST_SUCCESS,
  GET_SUPPLIER_TYPE_MASTER_LIST_FALIURE
} from '../action_types'

import { ApiGetNoAuth } from '../apiData'

// Action Creators

export const getSupplierTypeMasterSuccess = data => ({
  type: GET_SUPPLIER_TYPE_MASTER_LIST_SUCCESS,

  payload: data
})

export const getSupplierTypeMasterFaliure = error => ({
  type: GET_SUPPLIER_TYPE_MASTER_LIST_FALIURE,

  payload: error
})

// Async Action to Fetch Data

export const getSupplierTypeMaster = () => {
  return async dispatch => {
    try {
      const response = await ApiGetNoAuth(`/master/get-supp-type-list`, {})

      dispatch(getSupplierTypeMasterSuccess(response))
    } catch (error) {
      dispatch(getSupplierTypeMasterFaliure(error))
    }
  }
}
