import {
  ADD_SUB_CATEGORY_FALIURE,
  ADD_SUB_CATEGORY_SUCCESS,
  ADD_SUPPLIER_FALIURE,
  ADD_SUPPLIER_SUCCESS
} from '../action_types'

const initialState = {
  data: [],

  error: null
}

const addSupplier = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SUPPLIER_SUCCESS:
      return {
        ...state,

        data: action.payload,

        error: null
      }

    case ADD_SUPPLIER_FALIURE:
      return {
        ...state,

        data: [],

        error: action.payload
      }

    default:
      return state
  }
}

export default addSupplier
