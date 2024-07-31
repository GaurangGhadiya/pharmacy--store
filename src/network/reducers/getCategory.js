import { GET_CATEGORY_FALIURE, GET_CATEGORY_SUCCESS } from '../action_types'

const initialState = {
  data: [],

  error: null
}

const getCategory = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY_SUCCESS:
      return {
        ...state,

        data: action.payload,

        error: null
      }

    case GET_CATEGORY_FALIURE:
      return {
        ...state,

        data: [],

        error: action.payload
      }

    default:
      return state
  }
}

export default getCategory
