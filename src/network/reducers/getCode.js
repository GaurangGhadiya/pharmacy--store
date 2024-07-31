import { GET_CODE_FALIURE, GET_CODE_SUCCESS } from '../action_types'

const initialState = {
  data: [],

  error: null
}

const getCode = (state = initialState, action) => {
  switch (action.type) {
    case GET_CODE_SUCCESS:
      return {
        ...state,

        data: action.payload,

        error: null
      }

    case GET_CODE_FALIURE:
      return {
        ...state,

        data: [],

        error: action.payload
      }

    default:
      return state
  }
}

export default getCode
