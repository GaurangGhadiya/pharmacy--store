const axios = require('axios').default

// export const BaseURL = process.env.NEXT_PUBLIC_API_BASE_URL
export const BaseURL = 'http://192.168.11.67:3009/api'

export const BaseURLImage = 'http://192.168.11.67:3009/'

let defaultHeaders = {
  headers: {
    // 'Content-Type': 'text/json'
  }
}

function objectToQueryString(obj) {
  const queryParams = []

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      queryParams.push(`${key}=${obj[key]}`)
    }
  }

  return queryParams.join('&')
}

export const ApiPostNoAuth = (url, body) => {
  return new Promise((resolve, reject) => {
    axios

      .post(
        BaseURL + url,

        body,

        defaultHeaders
      )

      .then(responseJson => {
        const data = responseJson?.data

        console.log('data api', data)

        resolve(data)
      })

      .catch(error => {
        console.log('data api', error)

        if (
          error &&
          error.hasOwnProperty('response') &&
          error.response &&
          error.response.hasOwnProperty('data') &&
          error.response.data &&
          error.response.data.hasOwnProperty('message') &&
          error.response.data.error
        ) {
          reject(error.response.data)
        } else {
          reject(error)
        }
      })
  })
}

export const ApiGetNoAuth = (url, params = {}) => {
  let apiUrl = url + objectToQueryString(params)

  return new Promise((resolve, reject) => {
    axios

      .get(BaseURL + apiUrl, defaultHeaders)

      .then(async responseJson => {
        const data = responseJson?.data?.data

        console.log('data api', data)

        resolve(data)
      })

      .catch(error => {
        console.log('data api', error)

        if (
          error &&
          error.hasOwnProperty('response') &&
          error.response &&
          error.response.hasOwnProperty('data') &&
          error.response.data &&
          error.response.data.hasOwnProperty('message') &&
          error.response.data.error
        ) {
          reject(error.response.data)
        } else {
          reject(error)
        }
      })
  })
}
