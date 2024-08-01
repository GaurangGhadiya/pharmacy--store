import {
  GET_BRAND_LIST_FALIURE,
  GET_BRAND_LIST_SUCCESS,
  GET_CATEGORY_FALIURE,
  GET_CATEGORY_SUCCESS,
  GET_MENUFACTURER_LIST_FALIURE,
  GET_MENUFACTURER_LIST_SUCCESS,
  GET_PRODUCT_BY_ID_FALIURE,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_FALIURE,
  GET_PRODUCT_SUCCESS
} from '../action_types'

const initialState = {
  data: [],

  error: null
}

const getBrand = (state = initialState, action) => {
  switch (action.type) {
    case GET_BRAND_LIST_SUCCESS:
      return {
        ...state,

        data: action.payload,

        error: null
      }

    case GET_BRAND_LIST_FALIURE:
      return {
        ...state,

        data: [],

        error: action.payload
      }

    default:
      return state
  }
}

export default getBrand
