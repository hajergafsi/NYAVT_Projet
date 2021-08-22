import { baseURL } from "../redux"
import * as auth from "../app/modules/Auth/redux/authRedux"

export default function setupAxios(axios, store) {
  const AUTH_URL = `${baseURL}/UsersAuth/RefreshAccessToken`
  let sendHelper = 0

  store.subscribe(() => {
    const { auth: { user, authToken, refreshToken } } = store.getState()

    if (authToken && refreshToken && sendHelper === 0) {
      sendHelper = 1
      const currentTime = new Date().getTime()
      var AuthTokenExpiration = new Date(authToken.TokenExpiration).getTime(),
          RefreshTokenExpiration = new Date(refreshToken.TokenExpiration).getTime()

      if (AuthTokenExpiration >= currentTime) {
        startSetupAxios()
      } else if (RefreshTokenExpiration >= currentTime) {
        axios
          .post(AUTH_URL, {
            accessToken: authToken.Token,
            refreshToken: refreshToken.Token,
          })
          .then(({ data }) => {
            store.dispatch(auth.actions.login(data.Data.UserDto, data.Data.UserTokenDto))
            startSetupAxios()
          })
          .catch((error) => {
            store.dispatch(auth.actions.logoutExpiredToken(user.FirstName + " " + user.LastName))
          })
      } else {
        store.dispatch(auth.actions.logoutExpiredToken(user.FirstName + " " + user.LastName))
      }
    }
  })

  const startSetupAxios = () => {
    axios.interceptors.request.use(
      config => {
        const {
          auth: { authToken }
        } = store.getState()

        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken.Token}`
        }

        return config
      },
      err => Promise.reject(err)
    )
  }
}
