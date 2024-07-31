import { ADD_CATEGORY_FALIURE, ADD_CATEGORY_SUCCESS, ADD_PRODUCT_FALIURE, ADD_PRODUCT_SUCCESS } from '../action_types'

const initialState = {
  data: [],

  error: null
}

const addProduct = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,

        data: action.payload,

        error: null
      }

    case ADD_PRODUCT_FALIURE:
      return {
        ...state,

        data: [],

        error: action.payload
      }

    default:
      return state
  }
}

export default addProduct
