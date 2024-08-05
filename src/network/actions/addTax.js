import toast from 'react-hot-toast'
import {
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FALIURE,
  ADD_MENUFACTURER_LIST_SUCCESS,
  ADD_MENUFACTURER_LIST_FALIURE,
  ADD_SUPPLIER_TYPE_LIST_SUCCESS,
  ADD_SUPPLIER_TYPE_LIST_FALIURE,
  ADD_TAX_LIST_SUCCESS,
  ADD_TAX_LIST_FALIURE
} from '../action_types'

import { ApiGetNoAuth, ApiPostNoAuth } from '../apiData'

// Action Creators

export const addTaxSuccess = data => ({
  type: ADD_TAX_LIST_SUCCESS,

  payload: data
})

export const addTaxFaliure = error => ({
  type: ADD_TAX_LIST_FALIURE,

  payload: error
})

// Async Action to Fetch Data

export const addTax = (url, body, extra) => {
  return async dispatch => {
    try {
      const response = await ApiPostNoAuth(`/master/${url}`, body)
      console.log('response: ', response)
      toast.success(response?.message)
      extra()
      dispatch(addTaxSuccess(response))
    } catch (error) {
      console.log('response, errror')

      dispatch(addTaxFaliure(error))
    }
  }
}
