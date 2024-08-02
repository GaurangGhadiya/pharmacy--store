import {
  ADD_SUB_CATEGORY_FALIURE,
  ADD_SUB_CATEGORY_SUCCESS,
  DELETE_MENUFACTURER_LIST_FALIURE,
  DELETE_MENUFACTURER_LIST_SUCCESS,
  DELETE_PHARMA_GROUP_LIST_FALIURE,
  DELETE_PHARMA_GROUP_LIST_SUCCESS,
  DEDELETE_SUPPLIER_TYPE_FALIURE,
  LETE_SUPPLIER_TYPE_SUCCESS,
  DELETE_SUPPLIER_TYPE_SUCCESS,
  DELETE_SUPPLIER_TYPE_FALIURE
} from '../action_types'

const initialState = {
  data: [],

  error: null
}

const deleteSupplierType = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_SUPPLIER_TYPE_SUCCESS:
      return {
        ...state,

        data: action.payload,

        error: null
      }

    case DELETE_SUPPLIER_TYPE_FALIURE:
      return {
        ...state,

        data: [],

        error: action.payload
      }

    default:
      return state
  }
}

export default deleteSupplierType
