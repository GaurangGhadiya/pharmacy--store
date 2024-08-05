import { GET_CODE_FALIURE, GET_CODE_SUCCESS, GET_DRUG_FALIURE, GET_DRUG_SUCCESS } from '../action_types'

const initialState = {
  data: [],

  error: null
}

const getDrug = (state = initialState, action) => {
  switch (action.type) {
    case GET_DRUG_SUCCESS:
      return {
        ...state,

        data: action.payload,

        error: null
      }

    case GET_DRUG_FALIURE:
      return {
        ...state,

        data: [],

        error: action.payload
      }

    default:
      return state
  }
}

export default getDrug
