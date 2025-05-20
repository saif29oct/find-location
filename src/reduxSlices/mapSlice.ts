import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IMapState } from '../types/map'

const initialState: IMapState = {
  latitude: 23.78159,
  longitude: 90.40050,
  radius: 3000,
  categories: 13000,
  zoom: 14
}
const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    updatePosition(state: IMapState, action: PayloadAction<IMapState>) {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.zoom = action.payload.zoom;
    },
  },
})

export const { updatePosition } = mapSlice.actions
export default mapSlice.reducer
