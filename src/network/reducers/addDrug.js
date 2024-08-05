import {
  ADD_BRAND_LIST_FALIURE,
  ADD_BRAND_LIST_SUCCESS,
  ADD_CATEGORY_FALIURE,
  ADD_CATEGORY_SUCCESS,
  ADD_DRUG_LIST_FALIURE,
  ADD_DRUG_LIST_SUCCESS,
  ADD_MENUFACTURER_LIST_FALIURE,
  ADD_MENUFACTURER_LIST_SUCCESS
} from '../action_types'

const initialState = {
  data: [],

  error: null
}

const addDrug = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DRUG_LIST_SUCCESS:
      return {
        ...state,

        data: action.payload,

        error: null
      }

    case ADD_DRUG_LIST_FALIURE:
      return {
        ...state,

        data: [],

        error: action.payload
      }

    default:
      return state
  }
}

export default addDrug
