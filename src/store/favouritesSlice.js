import { createSlice } from "@reduxjs/toolkit";
import { addFavouriteToFirebase, auth, clearFavouritesFromFirebase, db } from "../auth/firebase";
import { collection, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { isLoading } from "./countriesSlice";

const initialState = {
    favourites: [],
    isLoading: true,
};

export const favouritesSlice = createSlice({
    name: "favourites",
    initialState,
    // Reducers are used for internal app state management (not from API or remote)
    reducers: {
        addFavourite(state, action) {
            state.favourites = [...state.favourites, action.payload];
            const user = auth.currentUser;
            if (user) addFavouriteToFirebase(user.uid, action.payload);

        },
        clearFavourites(state) {
            const user = auth.currentUser;
            if (user) clearFavouritesFromFirebase(user.uid);
            state.favourites = [];
        },
        removeFavourite (state, action) {
            state.favourites = state.favourites.filter(favourite => favourite !== action.payload);

            const user = auth.currentUser;
            if (user) {
                const q = query(
                    collection(db, `users/${user.uid}/favourites`),
                    where('name', '==', action.payload)
                );
                
                getDocs(q).then((querySnapshot) => {
                    querySnapshot.forEach((docSnap) => {
                        deleteDoc(docSnap.ref);
                    });
                }).catch((error) => {
                    console.error("Error removing favourite: ", error);
                });
            }
        },
        getFavourites(state, action) {
            state.favourites = action.payload;
        },
        favouritesIsLoading(state, action) {
            state.isLoading = action.payload;
        }
    },
});

export const getFavouritesFromSource = () => async (dispatch) => {
    const user = auth.currentUser;
    if (user) {
        const q = query(collection(db, `users/${user.uid}/favourites`));
        const querySnapshot = await getDocs(q);
        const favourites = querySnapshot.docs.map((doc) => doc.data().name);
        dispatch(getFavourites(favourites))
        dispatch(isLoading())
    }
}

export const { addFavourite, clearFavourites, removeFavourite, getFavourites, favouritesIsLoading } = favouritesSlice.actions;

export default favouritesSlice.reducer;