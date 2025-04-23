import { configureStore } from '@reduxjs/toolkit'
import mapReducer from './reduxSlices/mapSlice'

const store = configureStore({ reducer: {
    map: mapReducer
} })

export default store;

export type ReduxState = ReturnType<typeof store.getState>

export type ReduxDispatch = typeof store.dispatch
