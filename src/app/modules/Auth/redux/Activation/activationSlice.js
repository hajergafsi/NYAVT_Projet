import { createSlice } from '@reduxjs/toolkit'
import { reSendActivationCode as sendCode, activeUserByActivationCode } from '../authCrud'

const activationSlice = createSlice({
    name: "activation",
    initialState: {
        email: "",
        activationCode: "",
        statusCode: "",
        statusMessage: "",
        error: null,
        reSendActivationError: null,
        activationError: null,
        successResponse: null
    },
    reducers: {
        sendActivationCode: (state, action) => {
            return {
                ...state,
                email: action.payload.email,
                activationCode: action.payload.activationCode
            }
        },
        reSendActivationCode: (state, action) => {
            return {
                ...state,
                activationCode: action.payload.activationCode
            }
        },
        code_success: (state, action) => {
            return {
                ...state,
                error: false,
                statusCode: action.payload.status,
                successResponse: action.payload
            }
        },
        activation_code_error: (state, { payload }) => {
            return {
                ...state,
                error: true,
                statusCode: payload.StatusCode,
                activationError: payload.Error
            }
        },
        reSend_code_error: (state, { payload }) => {
            return {
                ...state,
                error: true,
                statusCode: payload.StatusCode,
                reSendActivationError: payload.ValidationErrors[0]
            }
        }
    }
})

export const { sendActivationCode, reSendActivationCode, activation_code_error, reSend_code_error, code_success } = activationSlice.actions
export default activationSlice.reducer

export const activationCode = (data) => async dispatch => {

    dispatch(sendActivationCode(data))
    try {
        const response = await activeUserByActivationCode(data)
        dispatch(code_success(response))
        return response
    } catch (err) {
        dispatch(activation_code_error(err.response.data))
    }
}

export const reActivationCode = (data) => async dispatch => {

    dispatch(reSendActivationCode(data))
    try {
        const response = await sendCode(data)
        /**
         * Activation Code is given as response,
         * should be replaced with a localized text
         * notifying user the code is sent.
         */
        dispatch(code_success(response)) // Here
    } catch (err) {
        dispatch(reSend_code_error(err.response.data))
    }
}
