import { LOGIN_FALIURE, LOGIN_SUCCESS } from '../action_types'

const initialState = {
  data: [],

  error: null
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,

        data: action.payload,

        error: null
      }

    case LOGIN_FALIURE:
      return {
        ...state,

        data: [],

        error: action.payload
      }

    default:
      return state
  }
}

export default login
