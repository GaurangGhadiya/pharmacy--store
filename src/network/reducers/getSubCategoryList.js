import {
  GET_SUB_CATEGORY_FALIURE,
  GET_SUB_CATEGORY_LIST_FALIURE,
  GET_SUB_CATEGORY_LIST_SUCCESS,
  GET_SUB_CATEGORY_SUCCESS
} from '../action_types'

const initialState = {
  data: [],

  error: null
}

const getSubCategoryList = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUB_CATEGORY_LIST_SUCCESS:
      return {
        ...state,

        data: action.payload,

        error: null
      }

    case GET_SUB_CATEGORY_LIST_FALIURE:
      return {
        ...state,

        data: [],

        error: action.payload
      }

    default:
      return state
  }
}

export default getSubCategoryList
