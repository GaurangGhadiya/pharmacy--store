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
  GET_SUPPLIER_LIST_FALIURE,
  GET_SUPPLIER_MASTER_LIST_SUCCESS,
  GET_SUPPLIER_MASTER_LIST_FALIURE,
  GET_UNIT_MASTER_LIST_SUCCESS,
  GET_UNIT_MASTER_LIST_FALIURE
} from '../action_types'

import { ApiGetNoAuth, ApiPostNoAuth } from '../apiData'

// Action Creators

export const getUnitMasterSuccess = data => ({
  type: GET_UNIT_MASTER_LIST_SUCCESS,

  payload: data
})

export const getUnitMasterFaliure = error => ({
  type: GET_UNIT_MASTER_LIST_FALIURE,

  payload: error
})

// Async Action to Fetch Data
export const getUnitMaster = (page = 1) => {
  return async dispatch => {
    try {
      const response = await ApiGetNoAuth(`/master/get-unit-list`)
      console.log('response: ', response)

      //   toast.success(response?.message)
      dispatch(getUnitMasterSuccess(response))
    } catch (error) {
      console.log('response, errror')

      dispatch(getUnitMasterFaliure(error))
    }
  }
}
