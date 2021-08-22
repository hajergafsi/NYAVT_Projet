import { createSlice } from "@reduxjs/toolkit"
import { reSendActivationCode, forgotPassword } from '../authCrud'
import { toastError, toastSuccess } from "../../../../../utility/Toast";

const forgotPasswordSlice = createSlice({
    name: "forgot_password",
    initialState: {
        email: null,
        activationCode: null
    },
    reducers: {
        _setEmail: (state, action) => {
            state.email = action.payload
        },
        setCode: (state, action) => {
            state.activationCode = action.payload
        }
    }
})

export const { _setEmail, setCode } = forgotPasswordSlice.actions
export default forgotPasswordSlice.reducer


export const setEmail = (email, intl) => dispatch => {
    reSendActivationCode(email)
        .then(() => {
            toastSuccess(intl.formatMessage({ id: "AUTH.FORGOT.SENTMAIL" }) , 3000)
            dispatch(_setEmail(email))
        })
        .catch((e) => {
            toastError(e.response.data?.ValidationErrors[0].Message)
        })
}

export const _setCode = (email, activationCode) => dispatch => {
    forgotPassword(email, activationCode)
        .then(({data}) => {
            toastSuccess(data.Message, 3000)
            dispatch(setCode(activationCode))
        })
        .catch((e) => toastError(e.response.data?.Error?.Message))
}