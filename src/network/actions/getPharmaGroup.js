import toast from 'react-hot-toast'
import {
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FALIURE,
  GET_MENUFACTURER_LIST_SUCCESS,
  GET_MENUFACTURER_LIST_FALIURE,
  GET_PHARMA_GROUP_LIST_SUCCESS,
  GET_PHARMA_GROUP_LIST_FALIURE
} from '../action_types'

import { ApiGetNoAuth, ApiPostNoAuth } from '../apiData'

// Action Creators

export const getPharmaGroupSuccess = data => ({
  type: GET_PHARMA_GROUP_LIST_SUCCESS,

  payload: data
})

export const getPharmaGroupFaliure = error => ({
  type: GET_PHARMA_GROUP_LIST_FALIURE,

  payload: error
})

// Async Action to Fetch Data
export const getPharmaGroup = (page = 1) => {
  return async dispatch => {
    try {
      const response = await ApiGetNoAuth(`/master/get-pharmagroup?page=${page}&pageSize=10`)
      console.log('response: ', response)

      //   toast.success(response?.message)
      dispatch(getPharmaGroupSuccess(response))
    } catch (error) {
      console.log('response, errror')

      dispatch(getPharmaGroupFaliure(error))
    }
  }
}
