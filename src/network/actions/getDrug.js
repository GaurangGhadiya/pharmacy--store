import { GET_CODE_SUCCESS, GET_CODE_FALIURE, GET_DRUG_SUCCESS, GET_DRUG_FALIURE } from '../action_types'

import { ApiGetNoAuth } from '../apiData'

// Action Creators

export const getDrugSuccess = data => ({
  type: GET_DRUG_SUCCESS,

  payload: data
})

export const getDrugFaliure = error => ({
  type: GET_DRUG_FALIURE,

  payload: error
})

// Async Action to Fetch Data

export const getDrug = () => {
  return async dispatch => {
    try {
      const response = await ApiGetNoAuth(`/master/get-item`, {})

      dispatch(getDrugSuccess(response))
    } catch (error) {
      dispatch(getDrugFaliure(error))
    }
  }
}
