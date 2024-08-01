import {
  ADD_SUB_CATEGORY_FALIURE,
  ADD_SUB_CATEGORY_SUCCESS,
  DELETE_MENUFACTURER_LIST_FALIURE,
  DELETE_MENUFACTURER_LIST_SUCCESS
} from '../action_types'

const initialState = {
  data: [],

  error: null
}

const deleteMenufacturer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_MENUFACTURER_LIST_SUCCESS:
      return {
        ...state,

        data: action.payload,

        error: null
      }

    case DELETE_MENUFACTURER_LIST_FALIURE:
      return {
        ...state,

        data: [],

        error: action.payload
      }

    default:
      return state
  }
}

export default deleteMenufacturer
