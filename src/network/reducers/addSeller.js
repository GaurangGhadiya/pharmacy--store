import {
  ADD_CATEGORY_FALIURE,
  ADD_CATEGORY_SUCCESS,
  ADD_PRODUCT_FALIURE,
  ADD_PRODUCT_SUCCESS,
  ADD_SELLER_FALIURE,
  ADD_SELLER_SUCCESS
} from '../action_types'

const initialState = {
  data: [],

  error: null
}

const addSeller = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SELLER_SUCCESS:
      return {
        ...state,

        data: action.payload,

        error: null
      }

    case ADD_SELLER_FALIURE:
      return {
        ...state,

        data: [],

        error: action.payload
      }

    default:
      return state
  }
}

export default addSeller
