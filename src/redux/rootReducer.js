import { all } from "redux-saga/effects"
import { combineReducers } from "redux"

import * as auth from "../app/modules/Auth/redux/authRedux"
import { loginSlice }  from "../app/modules/Auth/redux/Login/loginSlice"
import layoutReducer from './common/layout/Reducer'
import navbarReducer from './common/navbar/Reducer'
import {usersSlice} from '../app/modules/Account/redux/Slice'

export const rootReducer = combineReducers({
  auth: auth.reducer,
  layout: layoutReducer,
  navbar: navbarReducer,
  login: loginSlice.reducer,
  user: usersSlice.reducer
})

export function* rootSaga() {
  yield all([auth.saga()]);
}
