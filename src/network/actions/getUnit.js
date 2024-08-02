import { GET_CODE_SUCCESS, GET_CODE_FALIURE, GET_UNIT_SUCCESS, GET_UNIT_FALIURE } from '../action_types'

import { ApiGetNoAuth } from '../apiData'

// Action Creators

export const getUnitSuccess = data => ({
  type: GET_UNIT_SUCCESS,

  payload: data
})

export const getUnitFaliure = error => ({
  type: GET_UNIT_FALIURE,

  payload: error
})

// Async Action to Fetch Data

export const getUnit = () => {
  return async dispatch => {
    try {
      const response = await ApiGetNoAuth(`/master/get-unit`, {})

      dispatch(getUnitSuccess(response))
    } catch (error) {
      dispatch(getUnitFaliure(error))
    }
  }
}
