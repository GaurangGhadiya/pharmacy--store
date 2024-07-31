import toast from 'react-hot-toast'
import { ADD_SELLER_SUCCESS, ADD_SELLER_FALIURE, LOGIN_SUCCESS, LOGIN_FALIURE } from '../action_types'

import { ApiGetNoAuth, ApiPostNoAuth } from '../apiData'

// Action Creators

export const loginSuccess = data => ({
  type: LOGIN_SUCCESS,

  payload: data
})

export const loginFaliure = error => ({
  type: LOGIN_FALIURE,

  payload: error
})

// Async Action to Fetch Data

export const login = (url, body) => {
  return async dispatch => {
    try {
      const response = await ApiPostNoAuth(`/login/${url}`, body)
      console.log('response: ', response)
      toast.success(response?.message)
      dispatch(loginSuccess(response))

      //     localStorage.setItem(
      //   'userData',
      //   JSON.stringify({
      //     id: 1,
      //     role: 'admin',
      //     fullName: 'John Doe',
      //     username: 'johndoe',
      //     email: 'admin@vuexy.com'
      //   })
      // )
      localStorage.setItem('userData', JSON.stringify(response?.data))
      localStorage.setItem('accessToken', response?.token)

      window.location.pathname = '/dashboard'
    } catch (error) {
      console.log('response, errror', error)
      toast.error(error.response.data?.message)
      dispatch(loginFaliure(error))
    }
  }
}
