import * as requestToServer from "./Crud"
import { usersSlice, actionTypes } from "./Slice"

const { actions } = usersSlice

export const getUserById = (userId,AccessToken) => dispatch => {
  dispatch(actions.startCall({ callType: actionTypes.action }))
  return requestToServer
    .getById(userId,AccessToken)
    .then(response => {
      const { Data } = response.data;

      dispatch(actions.userFetched(Data))
    })
    .catch(error => {
      let errList = []
      if (error.response.data.ResultStatus === 1) {
        errList = `ERROR.500`
      }
      dispatch(actions.catchError({ error: errList, callType: actionTypes.action }));
    })
}
