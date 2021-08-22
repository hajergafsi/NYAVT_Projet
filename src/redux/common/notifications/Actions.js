import axios from "axios";
import { baseURL } from "../../";
import PropTypes from "prop-types";
import { userNotificationsSlice } from "./Slice";

const { actions } = userNotificationsSlice;
const USER_NOTIFICATIONS_URL = `${baseURL}/UserNotifications`;

export const getAllUserNotifications = ({
  userId,
  AccessToken
  // isActive = true,
  // isDeleted = false,
  // currentPage = 1,
  // pageSize = 20,
  // orderBy =1 ,
  // isAscending = false,
}) => (dispatch) => {
  dispatch(actions.startCall());
  return axios
    .get(`${USER_NOTIFICATIONS_URL}/GetAll?userId=${userId}`,{
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: `Bearer ${AccessToken}`,
      },
    })
    .then(({ data }) => {
      if (data.ResultStatus === 0) {
        dispatch(actions.setAllNotifications(data.Data));
      } else {
        dispatch(actions.catchError({ errors: ["Server_Error"] }));
      }
    })
    .catch((error) => {
      console.log(`error`, error)
      
      const validationErrorsName = error.response.data.ValidationErrors.map(
        (err) => err.Message
      );
      dispatch(actions.catchError({ errors: validationErrorsName }));
    })
    .finally(() => dispatch(actions.endCall()));
};

//delete

export const deleteNotification = (data,AccessToken) => (dispatch) => {
  console.log(`param`, data);
  dispatch(actions.startCall());
  return axios
    .post(`${USER_NOTIFICATIONS_URL}/HardDelete`, data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${AccessToken}`,
      },
    })
    .then((response) => {
      console.log(`response`, response);
    })
    .catch((error) => {});
};