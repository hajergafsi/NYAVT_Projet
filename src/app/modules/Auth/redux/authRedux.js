import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  Login: "Login",
  TokenExpired: "TokenExpired",
  RequestUser: "RequestUser",
  SetUser: "SetUser",
  RequestPassword: "RequestPassword",
  SetUserPreference: "SetUserPreference"
}

const initialAuthState = {
  user: null,
  authToken: null,
  refreshToken: null,
  expiredToken: null,
}

export const reducer = persistReducer(
  { 
    storage, 
    key: "janus", 
   // whitelist: ["user", "authToken", "refreshToken", "userPreferences"],
    whitelist: ["authToken", "refreshToken", "userPreferences"],
    blacklist: ["expiredToken"],
    version: 1.1 
  },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { UserDto, UserTokenDto } = action.payload
        return { ...state, 
          user: UserDto,
          authToken: {
            Token: UserTokenDto.AccessToken,
            TokenExpiration: UserTokenDto.TokenExpiration
          },
          refreshToken: {
            Token: UserTokenDto.RefreshToken,
            TokenExpiration: UserTokenDto.RefreshTokenExpiration
          }
        }
      }

      case actionTypes.Logout: {
        return initialAuthState
      }

      case actionTypes.TokenExpired: {
        const { fullName } = action.payload
        
        return { ...initialAuthState, expiredToken: { fullName, isTokenExpired: true } }
      }

      case actionTypes.SetUser: {
        const { UserDto } = action.payload

        return { ...state, user: UserDto }
      }
      
      case actionTypes.RequestPassword: {
        return initialAuthState
      }

      case actionTypes.SetUserPreference: {
        return { ...state,
          userPreferences: {
            ...state.userPreferences,
            ...action.payload
          }
        }
      }

      default:
        return state;
    }
  }
)

export const actions = {
  login: (UserDto, UserTokenDto) => ({ type: actionTypes.Login, payload: { UserDto, UserTokenDto } }),
  logoutExpiredToken: (fullName) => ({ type: actionTypes.TokenExpired, payload: { fullName } }),
  setUser: (UserDto) => ({ type: actionTypes.SetUser, payload: { UserDto } }),
  requestUser: () => ({ type: actionTypes.RequestUser }),
  requestPassword: () => ({ type: actionTypes.RequestPassword }),
  setUserPreferences: (preferences) => ({ type: actionTypes.SetUserPreference, payload: preferences }),
}

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser());
  })
}