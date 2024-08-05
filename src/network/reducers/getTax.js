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
  GET_PRODUCT_SUCCESS,
  GET_SUPPLIER_TYPE_LIST_FALIURE,
  GET_SUPPLIER_TYPE_LIST_SUCCESS,
  GET_TAX_LIST_FALIURE,
  GET_TAX_LIST_SUCCESS
} from '../action_types'

const initialState = {
  data: [],

  error: null
}

const getTax = (state = initialState, action) => {
  switch (action.type) {
    case GET_TAX_LIST_SUCCESS:
      return {
        ...state,

        data: action.payload,

        error: null
      }

    case GET_TAX_LIST_FALIURE:
      return {
        ...state,

        data: [],

        error: action.payload
      }

    default:
      return state
  }
}

export default getTax
