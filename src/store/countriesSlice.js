import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    countries: [],
    isLoading: true,
    search: '',
}

export const countriesSlice = createSlice({
    name: "countries",
    initialState,
    // Reducers are used for internal app state management (not from API or remote)
    reducers: {
        getCountries (state, action) {
            state.countries = action.payload;
        },
        isLoading (state, action) {
            state.isLoading = action.payload;
        },
        search (state, action) {
            state.search = action.payload;
        }
    },
    // Extra reducers are used for Async calls
    extraReducers() {},
});

// These are actions to be used in components later
export const { getCountries, isLoading, search } = countriesSlice.actions;

// THis is the connection to store.js
export default countriesSlice.reducer;