import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: '',
    userId: '',
    username: '',
    email: '',
    instructedCourses: [],
    enrolledCourses: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.token = action.payload.token,
            state.userId = action.payload.id,
            state.username = action.payload.username,
            state.email = action.payload.email,
            state.instructedCourses = action.payload.instructedCourses,
            state.enrolledCourses = action.payload.enrolledCourses
        }
    }
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;