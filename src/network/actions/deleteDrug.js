import toast from 'react-hot-toast'
import {
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FALIURE,
  ADD_MENUFACTURER_LIST_SUCCESS,
  ADD_MENUFACTURER_LIST_FALIURE,
  DELETE_MENUFACTURER_LIST_SUCCESS,
  DELETE_MENUFACTURER_LIST_FALIURE,
  DELETE_BRAND_LIST_SUCCESS,
  DELETE_BRAND_LIST_FALIURE,
  DELETE_DRUGLIST_SUCCESS,
  DELETE_DRUGLIST_FALIURE
} from '../action_types'

import { ApiGetNoAuth, ApiPostNoAuth } from '../apiData'

// Action Creators

export const deleteDrugSuccess = data => ({
  type: DELETE_DRUGLIST_SUCCESS,

  payload: data
})

export const deleteDrugFaliure = error => ({
  type: DELETE_DRUGLIST_FALIURE,

  payload: error
})

// Async Action to Fetch Data

export const deleteDrug = (url, body, extra) => {
  return async dispatch => {
    try {
      const response = await ApiPostNoAuth(`/master/${url}`, body)
      console.log('response: ', response)
      toast.success(response?.message)
      extra()
      dispatch(deleteDrugSuccess(response))
    } catch (error) {
      console.log('response, errror')

      dispatch(deleteDrugFaliure(error))
    }
  }
}
