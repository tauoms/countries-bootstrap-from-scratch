import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favourites: [],
};

export const favouritesSlice = createSlice({
    name: "favourites",
    initialState,
    // Reducers are used for internal app state management (not from API or remote)
    reducers: {
        addFavourite(state, action) {
            state.favourites = [...state.favourites, action.payload]
        },
        clearFavourites(state) {
            state.favourites = []
        },
        removeFavourite(state, action) {
            state.favourites = state.favourites.filter(favourite => favourite !== action.payload)
        }
    },
});

export const { addFavourite, clearFavourites, removeFavourite } = favouritesSlice.actions;

export default favouritesSlice.reducer;