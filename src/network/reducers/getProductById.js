import {
  GET_CATEGORY_FALIURE,
  GET_CATEGORY_SUCCESS,
  GET_PRODUCT_BY_ID_FALIURE,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_FALIURE,
  GET_PRODUCT_SUCCESS
} from '../action_types'

const initialState = {
  data: [],

  error: null
}

const getProductById = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,

        data: action.payload,

        error: null
      }

    case GET_PRODUCT_BY_ID_FALIURE:
      return {
        ...state,

        data: [],

        error: action.payload
      }

    default:
      return state
  }
}

export default getProductById
