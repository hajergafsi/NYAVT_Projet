import { createSlice } from "@reduxjs/toolkit"
import { login } from '../authCrud'
import { toastError, toastSuccess } from "../../../../../utility/Toast";
// import { GetUserPictureById } from '../../../Users/_redux/Settings/settingsSlice'

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        user: null,
        authToken: null,
        refreshToken: null,
        expiredToken: null
    },
    reducers: {
        setUser: (state, action) => {
            const { UserDto, UserTokenDto } = action.payload

            state.user = UserDto
            state.authToken = {
                Token: UserTokenDto.AccessToken,
                TokenExpiration: UserTokenDto.TokenExpiration
            }
            state.refreshToken = {
                Token: UserTokenDto.RefreshToken,
                TokenExpiration: UserTokenDto.RefreshTokenExpiration
            }
        }
    }
})

export const { setUser } = loginSlice.actions
//export default loginSlice.reducer

/**
 * Parameters for userLogin slice action
 * @param {String} email - User email address
 * @param {String} password - User Password
 * @param {String} culture - User language
 * @returns {Promise}
 */
export const userLogin = (email, password,lang) => async dispatch => {
    try {
        const res = await login(email, password)
        if (res) {
          const data = res.data;

          const User = {
            UserDto: data.Data.User,
            UserId: data.Data.User.Id,
            UserTokenDto: data.Data.UserToken,
          };
          // await dispatch(
          //   GetUserPictureById(User.UserDto, User.UserTokenDto.AccessToken)
          // );
         // localStorage.setItem("userData", JSON.stringify(User.UserDto));
          localStorage.setItem("userId", JSON.stringify(User.UserId));
          localStorage.setItem("tokenData", JSON.stringify(User.UserTokenDto));
       
          dispatch(
            setUser({ UserDto: User.UserDto, UserTokenDto: User.UserTokenDto })
          );
          toastSuccess(data.Message);
          return 200;
        } else {
          toastError(
            lang === "tr"
              ? "E-posta adresiniz veya şifreniz yanlıştır."
              : "Your email address or password is incorrect."
          );
        }
    
    } catch (err) {
        console.log(`err`, err)

        const response = err?.response?.data;
        toastError(response?.Error?.Message);
        if (response.ValidationErrors && response.ValidationErrors[0]) {
            for (let i = 0; i < response.ValidationErrors.length; i++) {
                toastError(response.ValidationErrors[i].Message);
            }
        } else {
        }

    }

}
