import toast from 'react-hot-toast'
import {
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FALIURE,
  GET_MENUFACTURER_LIST_SUCCESS,
  GET_MENUFACTURER_LIST_FALIURE
} from '../action_types'

import { ApiGetNoAuth, ApiPostNoAuth } from '../apiData'

// Action Creators

export const getMenufacturerSuccess = data => ({
  type: GET_MENUFACTURER_LIST_SUCCESS,

  payload: data
})

export const getMenufacturerFaliure = error => ({
  type: GET_MENUFACTURER_LIST_FALIURE,

  payload: error
})

// Async Action to Fetch Data
export const getMenufacturer = (page = 1) => {
  return async dispatch => {
    try {
      const response = await ApiGetNoAuth(`/master/get-manufacture?page=${page}&pageSize=10`)
      console.log('response: ', response)

      //   toast.success(response?.message)
      dispatch(getMenufacturerSuccess(response))
    } catch (error) {
      console.log('response, errror')

      dispatch(getMenufacturerFaliure(error))
    }
  }
}
