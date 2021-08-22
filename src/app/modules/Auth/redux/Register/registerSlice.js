import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

import apiConfig from "../../../../../configs/apiConfig";

const BASE_URL = apiConfig.url + apiConfig.endpoints.UsersAuth;

const userRegisterSlice = createSlice({
    name: "user_register",
    initialState:{
        firstName: "",
        lastName: "",
        userName: "",
        workspaceName: "",
        email: "test@gmail.com",
        password: "",
        statusCode: "",
        error: null,
        validationError: null,
        successResponse: null
    },
    reducers: {
        createUser: (state, action) => {
            return {
                ...state,
                email: action.payload.email,
                password: action.payload.password
            }
            
        },
        create_success: (state, action) => {
            return {
                ...state,
                error: false,
                statusCode: action.payload.status,
                successResponse: action.payload
            }
        },
        create_error: (state, { payload }) => {
            return {
                ...state,
                error: true,
                statusCode: payload.status,
                validationError: payload.data.Error
            }
        }
    }
})

export const { createUser, create_success, create_error } = userRegisterSlice.actions
export default userRegisterSlice.reducer

export const register = (data) => {
    return async dispatch => {
        dispatch(createUser(data))
        try {
            await axios.post(`${BASE_URL}/Register`, data)
                    .then((response) => {
                        dispatch(create_success(response))
                    })
                    .catch((err) => {
                        dispatch(create_error(err.response))
                    })
        } catch (e) {
            console.log(e)
        }
    }
}
