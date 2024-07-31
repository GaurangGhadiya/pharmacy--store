import { GET_CATEGORY_LIST_FALIURE, GET_CATEGORY_LIST_SUCCESS } from '../action_types'

const initialState = {
  data: [],

  error: null
}

const getCategoryList = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY_LIST_SUCCESS:
      return {
        ...state,

        data: action.payload,

        error: null
      }

    case GET_CATEGORY_LIST_FALIURE:
      return {
        ...state,

        data: [],

        error: action.payload
      }

    default:
      return state
  }
}

export default getCategoryList
