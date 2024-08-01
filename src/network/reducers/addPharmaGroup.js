import {
  ADD_CATEGORY_FALIURE,
  ADD_CATEGORY_SUCCESS,
  ADD_MENUFACTURER_LIST_FALIURE,
  ADD_MENUFACTURER_LIST_SUCCESS,
  ADD_PHARMA_GROUP_LIST_FALIURE,
  ADD_PHARMA_GROUP_LIST_SUCCESS
} from '../action_types'

const initialState = {
  data: [],

  error: null
}

const addPharmaGroup = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PHARMA_GROUP_LIST_SUCCESS:
      return {
        ...state,

        data: action.payload,

        error: null
      }

    case ADD_PHARMA_GROUP_LIST_FALIURE:
      return {
        ...state,

        data: [],

        error: action.payload
      }

    default:
      return state
  }
}

export default addPharmaGroup
