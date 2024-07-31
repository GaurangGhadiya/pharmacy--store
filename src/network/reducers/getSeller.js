import {
  GET_CATEGORY_FALIURE,
  GET_CATEGORY_SUCCESS,
  GET_PRODUCT_FALIURE,
  GET_PRODUCT_SUCCESS,
  GET_SELLER_FALIURE,
  GET_SELLER_SUCCESS
} from '../action_types'

const initialState = {
  data: [],

  error: null
}

const getSeller = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_SUCCESS:
      return {
        ...state,

        data: action.payload,

        error: null
      }

    case GET_SELLER_FALIURE:
      return {
        ...state,

        data: [],

        error: action.payload
      }

    default:
      return state
  }
}

export default getSeller
