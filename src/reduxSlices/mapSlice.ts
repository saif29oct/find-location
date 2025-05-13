import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface IMapState {
  name?: string,
  longitude: number,
  latitude: number,
  radious?: number,
  categories?: number
  zoom?: number,
}

const initialState: IMapState = {
  latitude: 23.78159,
  longitude: 90.40050,
  radious: 3000,
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
    },
  },
})

export const { updatePosition } = mapSlice.actions
export default mapSlice.reducer
