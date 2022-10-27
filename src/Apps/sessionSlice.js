import { createSlice } from '@reduxjs/toolkit'

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    userName:'',
    Profile:[],
  },
  reducers: {
    setUserRegisted: (state, action) => {
      state.userName = action.payload.custName
      state.Profile = action.payload
    },
    setUser: (state, action) => {
        state.userName = action.payload[0].custName
        state.Profile = action.payload[0]
    },
    setUserEdit: (state, action) => {
        state.userName = action.payload.custName
        state.Profile = action.payload
    },
    setUserLogout: (state) => {
      state.userName = ''
        state.Profile = []
  },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setUserEdit, setUserLogout, setUserRegisted } = sessionSlice.actions
export const selectProfile = (state) => state.session.Profile
export const selectUser = (state) => state.session.userName
export const selectIsLogedIn = (state) => state.session.isLogedIn
export default sessionSlice.reducer