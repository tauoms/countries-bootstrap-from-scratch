// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, deleteDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
// Remember to move apiKey to env file
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "countries-react-58bde.firebaseapp.com",
  projectId: "countries-react-58bde",
  storageBucket: "countries-react-58bde.appspot.com",
  messagingSenderId: "383641828306",
  appId: "1:383641828306:web:1c4537a0c436bc58ac260b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const loginWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        // res = response
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"),
        {
            uid: user.uid,
            // shorthand for name: name
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
};

const logout = () => {
    signOut(auth);
}

const addFavouriteToFirebase = async (uid, name) => {
    try {
        await addDoc(collection(db, `users/${uid}/favourites`), {name});
        console.log("Favourite added to Firebase");
    } catch (error) {
        console.log("Error adding favourite to firebase", error)
    }
}

const removeFavouriteFromFirebase = async (uid, CountryName) => {
    try {
        if (!CountryName) {
            console.error("Error removing favourite from Firebase: Name parameter undefined");
            return;
        }
        const q = query(collection(db, `users/${uid}/favourites`), where("name", "==", CountryName));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
            console.log("Favourite removed from Firebase");
        })
    } catch (error) {
        console.log("Error removing favourite from Firebase", error);
    }
}

const clearFavouritesFromFirebase = async (uid) => {
    try {
        const q = query(collection(db, `users/${uid}/favourites`));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
            console.log("Favourites cleared from Firebase");
        })
    } catch (error) {
        console.log("Error clearing favourites from Firebase", error);
    }
}

export { auth, db, loginWithEmailAndPassword, registerWithEmailAndPassword, logout, addFavouriteToFirebase, removeFavouriteFromFirebase, clearFavouritesFromFirebase };