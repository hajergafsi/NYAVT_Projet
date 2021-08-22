import { createSlice } from "@reduxjs/toolkit"

const initialUserNotificationsSlice = {
    data: undefined,
    isLoading: false,
    error: undefined
}

export const userNotificationsSlice = createSlice({
    name: "notifications",
    initialState: initialUserNotificationsSlice,
    reducers: {
        startCall: (state, action) => {
            state.isLoading = true
            state.error = undefined
        },
        endCall: (state, action) => {
            state.isLoading = false
        },
        catchError: (state, action) => {
            state.error = action.payload.errors
        },
        setAllNotifications: (state, action) => {
            state.data = action.payload
            state.error = undefined
        }
    }
})