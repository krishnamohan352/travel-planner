import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: localStorage.getItem('trips')
        ? JSON.parse(localStorage.getItem('trips'))
        : []
}

const saveTrips = createSlice({
    name: "trip",
    initialState,
    reducers: {
        addTrip: (state, action) => {
            state.items.push(action.payload);
            localStorage.setItem('trips', JSON.stringify(state.items));
        },
        deleteTrip: (state, action) => {
            state.items = state.items.filter(trip => trip.id !== action.payload);
            localStorage.setItem('trips', JSON.stringify(state.items));
        }
    }
})

export const { addTrip, deleteTrip } = saveTrips.actions;
export default saveTrips.reducer;