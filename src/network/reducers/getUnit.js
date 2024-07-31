import { GET_CODE_FALIURE, GET_CODE_SUCCESS, GET_UNIT_FALIURE, GET_UNIT_SUCCESS } from '../action_types'

const initialState = {
  data: [],

  error: null
}

const getUnit = (state = initialState, action) => {
  switch (action.type) {
    case GET_UNIT_SUCCESS:
      return {
        ...state,

        data: action.payload,

        error: null
      }

    case GET_UNIT_FALIURE:
      return {
        ...state,

        data: [],

        error: action.payload
      }

    default:
      return state
  }
}

export default getUnit
