import { configureStore, createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, user: null },
  reducers: {
    setAuth(state, action) { state.token = action.payload.token; state.user = action.payload.user },
    logout(state){ state.token = null; state.user = null }
  }
})

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: { items: [] },
  reducers: {
    setPortfolio(state, action){ state.items = action.payload },
    addItem(state, action){ state.items.push(action.payload) },
    removeItem(state, action){ state.items = state.items.filter(i=>i.id!==action.payload) }
  }
})

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    portfolio: portfolioSlice.reducer
  }
})

export const authActions = authSlice.actions
export const portfolioActions = portfolioSlice.actions
export default store
