import { ADD_CATEGORY_FALIURE, ADD_CATEGORY_SUCCESS } from '../action_types'

const initialState = {
  data: [],

  error: null
}

const addCategory = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,

        data: action.payload,

        error: null
      }

    case ADD_CATEGORY_FALIURE:
      return {
        ...state,

        data: [],

        error: action.payload
      }

    default:
      return state
  }
}

export default addCategory
