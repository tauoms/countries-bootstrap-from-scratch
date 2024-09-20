// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
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

export { auth, db, loginWithEmailAndPassword, registerWithEmailAndPassword, logout };