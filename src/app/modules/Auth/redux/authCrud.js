import axios from "axios"
import apiConfig from "../../../../configs/apiConfig"
import { baseURL } from "../../../../redux"
import { getCulture, getTokenData } from "../../../../utility/Utils"

const AUTH_URL = `${baseURL}/UsersAuth`

/**
 * Getting browser or preferred language from getCulture()
 * and adding it to every axios request as header
 * to get response in desired language
 */
axios.interceptors.request.use(response => {
  response.headers['Accept-Language'] = getCulture()
  return response
})

axios.interceptors.response.use(config => {
  return config
}, async err => {
  const statusCode = err.response.status;

  if (statusCode === 401) {

    const { RefreshToken, RefreshTokenExpiration, AccessTokenExpiration } = getTokenData()

    const refreshTokenExp = new Date(RefreshTokenExpiration).getTime()
    const accessTokenExp = new Date(AccessTokenExpiration).getTime()
    const currentTime = new Date().getTime()

    console.log(refreshTokenExp > currentTime, currentTime > accessTokenExp);

    if (refreshTokenExp > currentTime && currentTime > accessTokenExp) {
      axios.post(`${apiConfig.url}/UsersAuth/RefreshAccessToken`, {
        refreshToken: RefreshToken
      }).then(({ data }) => {
        const user = data.Data.User
        const userToken = data.Data.UserToken

        console.log(data);

       // localStorage.setItem('userData', JSON.stringify(user))
       localStorage.setItem("userId", JSON.stringify(user.Id));
        localStorage.setItem('tokenData', JSON.stringify(userToken))
      }).catch(e => {
      //  localStorage.removeItem('userData')
        localStorage.removeItem('tokenData')
        window.location.replace('/')
      })

    } else {
     // localStorage.removeItem('userData')
      localStorage.removeItem('tokenData')
      window.location.replace('/')
    }


  }
})

export function login(email, password) {
  return axios.post(`${AUTH_URL}/Login`, {
    email,
    password
  })
}

export function forgotPassword(email, activationCode) {
  return axios.post(`${AUTH_URL}/ForgotPassword`, {
    email,
    activationCode
  })
}

export function changePassword(id, password, newPassword, accessToken) {
  return axios.post(`${baseURL}/Users/ChangePassword`, {
    id,
    password,
    newPassword
  }, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
}

export function reSendActivationCode(email) {
  return axios.post(`${AUTH_URL}/ReSendActivationCode?emailAddress=${email}`)
}

export function activeUserByActivationCode(code) {
  return axios.post(`${AUTH_URL}/ActivateUserByActivationCode`, code)
}
