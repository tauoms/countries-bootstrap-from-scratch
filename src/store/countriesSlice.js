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
    reducers: {},
    // Extra reducers are used for Async calls
    extraReducers() {},
});