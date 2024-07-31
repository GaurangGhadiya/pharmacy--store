import { ADD_SUB_CATEGORY_FALIURE, ADD_SUB_CATEGORY_SUCCESS } from '../action_types'

const initialState = {
  data: [],

  error: null
}

const addSubCategory = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SUB_CATEGORY_SUCCESS:
      return {
        ...state,

        data: action.payload,

        error: null
      }

    case ADD_SUB_CATEGORY_FALIURE:
      return {
        ...state,

        data: [],

        error: action.payload
      }

    default:
      return state
  }
}

export default addSubCategory
